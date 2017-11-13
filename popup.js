function getCurrentTabURL(callback) {
  chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {
    callback(arrayOfTabs[0].url);
  });
}


//TODO: Clean up comments and write real documentation on how this was executed at a later time -Erica

// Initializing the variable title content and explore url
  var title;
  var explore = 'https://www.instagram.com/explore/';

// Initalizing JSON object, setting up specific data to send to mavrck
  var jsonData = {
    "id" : "",
    "username" : "",
    "fullname" : "",
    "email" : "",
    "website" : "",
    "followers" : "",
    "following" : "",
    "influencerType" : "",
    "sponsorPosts" : "",
    "engagement" : {
      "likesPerPost": "",
      "commentsPerPost": "",
      "engPerPost": "",
      "postEngRate": "",
      "followers" : "",
      "likeCommentRatio" : "",
      "perPost" : "",
      "Post" : ""
    }
  };

// Builds JSON object to display data
  function buildJSON() {
    getCurrentTabURL((url) => {
      if (onUserPage(url) && onInstagram(url)){
        var user = userJSON(url);
        if (user) {
          // analyze user here and update jsonData

          if (user.user.biography) {
            var email = extractEmails(user.user.biography);
            var website = extractWebsite(user.user.biography);
            if (email) {
              jsonData.email = email;
            }
          }

          if (user.user.external_url) {
            jsonData.website = user.user.external_url;
          } else {
            // checking bio for url
            if (website) {
              jsonData.website = website;
            }
          }

          jsonData.id = user.user.id;
          jsonData.username = user.user.username;
          jsonData.fullname = user.user.full_name;
          jsonData.followers = user.user.followed_by.count;
          jsonData.following = user.user.follows.count;
          jsonData.sponsorPosts = sponsorMetrics(user.user.media);
          jsonData.engagement.likesPerPost = likesPerPost(user.user.media.nodes).toFixed(2);
          jsonData.engagement.commentsPerPost = commentsPerPost(user.user.media.nodes).toFixed(2);
          jsonData.engagement.engPerPost = engPerPost(user.user.media.nodes).toFixed(2);
          jsonData.engagement.postEngRate = postEngRate(jsonData.engagement.engPerPost, user.user.followed_by.count).toFixed(2);
          jsonData.engagement.likeCommentRatio = commentLikeRatio(user).toFixed(2);

          // Determine influencerType
          switch (true) {
            case jsonData.followers > 1000000:
              jsonData.influencerType = "Mega";
              break;
            case jsonData.followers > 50000:
              jsonData.influencerType = "Macro";
              break;
            case jsonData.followers > 5000:
              jsonData.influencerType = "Micro";
              break;
            default:
              jsonData.influencerType = "Nano";
              break;
          }

          // Current data from user. for troubleshooting
          // console.log(jsonData);

          // Capturing the contents of the title tag
          title = $("title").html();

        } else {
          console.log("There is no json at /?__a=1");
        }

      } else {
        console.log("Not on instagram");
      }
    });
  }

// Getting additionaluser data
  function buildMore() {
    getCurrentTabURL((url) => {
      if (onUserPage(url) && onInstagram(url)){
        var user = userJSON(url);
        if (user) {
          // analyze user here and update jsonData
          if (user.user.media.page_info.has_next_page) {
            console.log("there is more");
            // var num = 0;
            var moreJson = user;
            while (moreJson.user.media.page_info.has_next_page) {
              moreJson = nextUserPage(url, moreJson.user.media.page_info.end_cursor);
              console.log(moreJson);
            }

          }

          // jsonData.sponsorPosts = sponsorMetrics(user.user.media);
          // jsonData.engagement.likesPerPost = likesPerPost(user.user.media.nodes).toFixed(2);
          // jsonData.engagement.commentsPerPost = commentsPerPost(user.user.media.nodes).toFixed(2);
          // jsonData.engagement.engPerPost = engPerPost(user.user.media.nodes).toFixed(2);
          // jsonData.engagement.postEngRate = postEngRate(jsonData.engagement.engPerPost, user.user.followed_by.count).toFixed(2);
          // jsonData.engagement.likeCommentRatio = commentLikeRatio(user).toFixed(2);

          // Capturing the contents of the title tag
          title = $("title").html();

        } else {
          console.log("There is no json at /?__a=1, within buildMore");
        }

      } else {
        console.log("Not on instagram, within buildMore");
      }
    });
  }

// userJson.user.media.nodes every image
//userJson.user.media.nodes.length is the size of the array
// userJson.user.media.nodes[i] object
//userJson.user.media.nodes[0].comments.count comment count
//userJson.user.media.nodes[0].likes.count like count
  function commentLikeRatio(userJson) {
    var sumRatios = 0;
    var nodes = userJson.user.media.nodes.length;
    for (i = 0; i < nodes; i++) {
      sumRatios += userJson.user.media.nodes[i].likes.count / userJson.user.media.nodes[i].comments.count;
    }
    var avg = sumRatios/nodes;
      return avg;
  }

  function sponsorMetrics(userJson){
    var sponsorPostCount = 0;
    var items = userJson.nodes.length;
    var tags = ["#sponsor","#sponsored","#ad","#advertisement","#promotion"];

    for (i = 0; i < items; i++) {
      if (userJson.nodes[i].caption) {
        currentPostText = userJson.nodes[i].caption.text

        for (var j = 0; j < tags.length; j++) {
          if (RegExp(tags[j]).test(currentPostText)) {
            sponsorPostCount++;
            break;
          }
        }
      }
    }

    return sponsorPostCount;
  }

// checks if the user ison instagram.com
  function onInstagram(url) {
    if(url.indexOf("instagram.com") > -1) {
      // alert("you are on an instagram page when you refresh the page");
      return true;
    }
  }

// function for identifying if on user page
// how is this actually working?  can we make it more specific for user only?
  function onUserPage(url) {
    var exp = "instagram\.com\/([\.a-z0-9_-]+?)\/$";
    var regex = new RegExp(exp); //instagram.com/[user]/
    if (regex.test(url) && url != explore) {
        // alert("regex works, can put logic for recognizing an instagram user here");
        return true;
    }
  }

// Pulling JSON object from /?__a=1
  function userJSON(url) {
    var json;
    // Using .ajax so that async can be set to false allowing for returning the json element from the function
    $.ajax({
      url: url + "?__a=1",
      dataType: 'json', //data type received from server
      async: false, //set to false so that value can be returned
      success: function(data) {
        json = data
      }
    });
    return json;
  }

// Pulling additional pages of user data
  function nextUserPage(url, endCursor) {
    var json;
    // Using .ajax so that async can be set to false allowing for returning the json element from the function
    $.ajax({
      url: url + "?__a=1&max_id=" + endCursor,
      dataType: 'json', //data type received from server
      async: false, //set to false so that value can be returned
      success: function(data) {
        json = data
      }
    });
    return json;
  }

// Likes per Post = (Sum Likes Comments) / Post Count (last 20 posts or 90 days, whichever is shorter)
  function likesPerPost(posts){
    var total=0;
    for (var i = 0; i < posts.length; i++) {
      total += posts[i].likes.count;
    }
    return total/posts.length;
  }

//Comments per post =   (Sum Post Comments) / Post Count
  function commentsPerPost(posts){
    var total=0;
    for (var i = 0; i < posts.length; i++) {
      total += posts[i].comments.count;
    }
    return total/posts.length;
  }

//Engagement per post (likes + comments / last 20 posts)
  function engPerPost(posts){
    var total=0;
    for (var i = 0; i < posts.length; i++) {
      total += posts[i].comments.count + posts[i].likes.count;
    }
    return total/posts.length;
  }

//Engagement rate: (Post Likes + Post Comments) / Follower Count
  function postEngRate(engagement,followers) {
    return (engagement/followers)*100;
  }

// Scraping Email from Bio
  function extractEmails (bio){
      return bio.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
  }

  function extractWebsite (bio){
  	var foundSites = bio.match(/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi);
    if (foundSites) {
      var websites = [];
      var regexVariable = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/i;
      var regexTest = new RegExp(regexVariable);
      var j = 0;
      for (var i = 0; i < foundSites.length; i++) {
        if (regexTest.test(foundSites[i]) == false) {
          websites[j] = foundSites[i];
          j = j + 1;
        }
      }

      return websites;
    } else {
      return false;
    }
  }

// sending JSON to endpoint - will be Mavrck API
  function sendJSON (json) {
    $.ajax({
      // url: , // Mavrck endpoint
      data: json,
      dataType: 'json',
      success: function(msg) {
        if (msg) {
          alert("sent");
        } else {
          alert("error");
        }
      }
    });
  }

// Update UI
  function updateUI() {
    document.getElementById('iType').innerHTML = jsonData.influencerType;
    document.getElementById('engRate').innerHTML = jsonData.engagement.engPerPost;
    document.getElementById('avgComments').innerHTML = jsonData.engagement.commentsPerPost;
    document.getElementById('avgLikes').innerHTML =  jsonData.engagement.likesPerPost;
  }

// Calling buildJSON to run code on load
  buildJSON();

// This code will execute when elements are modified under the body element
// update to title and DOMelement subtree
  $(window).on("load", function() {
    // or just instagram
    if (title != $('title').html()) {
      buildJSON();
    }
    updateUI();
    // this should be under the title check but it causes the UI to load too slowly
    buildMore();
  });

  $("body").on("click", function() {
    // or just instagram
    if (title != $('title').html()) {
      buildJSON();
    }
    updateUI();
    // this should be under the title check but it causes the UI to load too slowly
    buildMore();
  });
