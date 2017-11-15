function getCurrentTabURL(callback) {
  chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {
    callback(arrayOfTabs[0].url);
  });
}


//TODO: Clean up comments and write real documentation on how this was executed at a later time -Erica

// Initializing the variable title content and explore url
  var title;
  var moreTitle;
  var explore = 'https://www.instagram.com/explore/';
  var developer = 'https://www.instagram.com/developer/';

// Initalizing JSON object, setting up specific data to send to mavrck
  var jsonData = {
    "id" : "",
    "handle" : "",
    "fullName" : "",
    "email" : "",
    "website" : "",
    "followers" : "",
    "following" : "",
    "profilePicture" : "",
    "bio" : "",
    "mediaCount" : "",
    "influencerType" : "",
    "sponsorPosts" : "",
    "engagement" : {
      "likesPerPost": "",
      "commentsPerPost": "",
      "engPerPost": "",
      "postEngRate": "",
      "fake_followers" : "",
      "likeCommentRatio" : "",
      "perPost" : "",
      "Post" : ""
    },
    "lifetime_sponsorPosts" : "",
    "lifetime_engagement" : {
      "likesPerPost": "",
      "commentsPerPost": "",
      "engPerPost": "",
      "postEngRate": "",
      "fake_followers" : "",
      "likeCommentRatio" : "",
      "perPost" : "",
      "Post" : ""
    }
  };

// Data structure from Mavrck
  var data = {
      source: "TOMAHAWK",
      sourceDetail: "missle",
      analysisVersion: 1,
      fullName: jsonData.fullName,
      email : jsonData.email,
      instagramAccount : {
          id : jsonData.id,
          handle : jsonData.handle,
          followersCount : jsonData.followers,
          followingCount : jsonData.following,
          fullName : jsonData.fullName,
          profilePicture : jsonData.profilePicture,
          bio : jsonData.bio,
          mediaCount: jsonData.mediaCount,
          averageLikes : jsonData.engagement.likesPerPost,
          averageComments : jsonData.engagement.commentsPerPost,
          sponsoredPostRate : jsonData.sponsorPosts
      }
  }

// Builds JSON object to display data
  function buildJSON() {
    getCurrentTabURL((url) => {
      if (onUserPage(url) && onInstagram(url)){
        var user = userJSON(url);
        if (user) {
          // analyze user here and update jsonData

          if (user.user.biography) {
            jsonData.bio = user.user.biography;
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
          jsonData.handle = user.user.username;
          jsonData.fullname = user.user.full_name;
          jsonData.followers = user.user.followed_by.count;
          jsonData.following = user.user.follows.count;
          jsonData.profilePicture = user.user.profile_pic_url;
          jsonData.mediaCount = user.user.media.count;
          jsonData.sponsorPosts = sponsorMetrics(user.user.media);
          jsonData.engagement.likesPerPost = likesPerPost(user.user.media.nodes).toFixed(2);
          jsonData.engagement.commentsPerPost = commentsPerPost(user.user.media.nodes).toFixed(2);
          jsonData.engagement.engPerPost = engPerPost(user.user.media.nodes).toFixed(2);
          jsonData.engagement.postEngRate = postEngRate(jsonData.engagement.engPerPost, user.user.followed_by.count).toFixed(2);
          jsonData.engagement.likeCommentRatio = commentLikeRatio(user).toFixed(2);
          jsonData.engagement.fake_followers = fakeFollowers();

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

          updateData();

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
            var moreJson = user;
            while (moreJson.user.media.page_info.has_next_page) {
              moreJson = nextUserPage(url, moreJson.user.media.page_info.end_cursor);
              user.user.media.nodes = user.user.media.nodes.concat(moreJson.user.media.nodes);
            }

          }
          // for troubleshooting
          // console.log(user);

          jsonData.lifetime_sponsorPosts = sponsorMetrics(user.user.media);
          jsonData.lifetime_engagement.likesPerPost = likesPerPost(user.user.media.nodes).toFixed(2);
          jsonData.lifetime_engagement.commentsPerPost = commentsPerPost(user.user.media.nodes).toFixed(2);
          jsonData.lifetime_engagement.engPerPost = engPerPost(user.user.media.nodes).toFixed(2);
          jsonData.lifetime_engagement.postEngRate = postEngRate(jsonData.engagement.engPerPost, user.user.followed_by.count).toFixed(2);
          jsonData.lifetime_engagement.likeCommentRatio = commentLikeRatio(user).toFixed(2);
          jsonData.lifetime_engagement.fake_followers = fakeFollowers();

          // Capturing the contents of the title tag
          moreTitle = $("title").html();

        } else {
          console.log("There is no json at /?__a=1, within buildMore");
        }

      } else {
        console.log("Not on instagram, within buildMore");
      }
    });
  }

// Updating data object
  function updateData() {
    data.fullName: jsonData.fullName;
    data.email : jsonData.email;
    data.instagramAccount.id : jsonData.id;
    data.instagramAccount.handle : jsonData.handle;
    data.instagramAccount.followersCount : jsonData.followers;
    data.instagramAccount.followingCount : jsonData.following;
    data.instagramAccount.fullName : jsonData.fullName;
    data.instagramAccount.profilePicture : jsonData.profilePicture;
    data.instagramAccount.bio : jsonData.bio;
    data.instagramAccount.mediaCount: jsonData.mediaCount;
    data.instagramAccount.averageLikes : jsonData.engagement.likesPerPost;
    data.instagramAccount.averageComments : jsonData.engagement.commentsPerPost;
    data.instagramAccount.sponsoredPostRate : jsonData.sponsorPosts;
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
    if (regex.test(url) && url != explore && url != developer) {
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
    var data = JSON.stringify(json);
    $.ajax({
        type: 'post',
        // Leaving url commented out so we don't hit the database with un-needed users
        // url: "http://app.splashscore.com/instagram-accounts?token=ff7434aab28e342b9e84505f8da8848ba6b0b7245291560fb7f07d5788596cb2c77749ea863140901a1d644fb68104db",  // Mavrck endpoint
        data: data,
        crossDomain: true,
        contentType: 'application/json',
        dataType: 'json',
        success: function(msg) {
            console.log(msg);
        },
        error: function(msg) {
            console.log(msg);
        }
    });
}

// Fake followers
  function fakeFollowers() {
    switch (true) {
      case jsonData.followers > 1000000:
        return engCheck(jsonData.engagement.postEngRate, 1.66, 0.06);
        break;
      case jsonData.followers > 100000:
        return engCheck(jsonData.engagement.postEngRate, 1.78, 0.09);
        break;
      case jsonData.followers > 10000:
        return engCheck(jsonData.engagement.postEngRate, 2.37, 0.14);
        break;
      case jsonData.followers > 1000:
        return engCheck(jsonData.engagement.postEngRate, 4.04, 0.27);
        break;
      default:
        return engCheck(jsonData.engagement.postEngRate, 8.03, 0.56);
        break;
    }
  }

  function engCheck(postEngRate, perPerc, crPerc) {
    console.log("post engagement rate:" + postEngRate);
    console.log("engRate %:" + perPerc);
    console.log("comment rate %:" + crPerc);
    if (postEngRate > perPerc || postEngRate < crPerc) {
      return "warning";
    } else {
      return "good";
    }
  }

// Update UI
  function updateUI() {
    document.getElementById('iType').innerHTML = jsonData.influencerType;
    document.getElementById('engRate').innerHTML = jsonData.engagement.engPerPost;
    document.getElementById('avgComments').innerHTML = jsonData.engagement.commentsPerPost;
    document.getElementById('avgLikes').innerHTML =  jsonData.engagement.likesPerPost;
    if (jsonData.engagement.fake_followers == "good") {
      $("#fake_followers").hide();
    } else {
      $("#fake_followers").show();
    }
  }

  function updateMoreUI() {
    document.getElementById('iType').innerHTML = jsonData.influencerType;
    document.getElementById('engRate').innerHTML = jsonData.lifetime_engagement.engPerPost;
    document.getElementById('avgComments').innerHTML = jsonData.lifetime_engagement.commentsPerPost;
    document.getElementById('avgLikes').innerHTML =  jsonData.lifetime_engagement.likesPerPost;
    if (jsonData.lifetime_engagement.fake_followers == "good") {
      $("#fake_followers").hide();
    } else {
      $("#fake_followers").show();
    }
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

  });

  $(".icon").on("click", function() {
    // or just instagram
    if (title != $('title').html()) {
      buildJSON();
    }
    updateUI();

  });

  // Updates to all user data if Mavrck logo is clicked
  $("#logo").on("click", function() {
    if (moreTitle != $('title').html()) {
      buildMore();
    }
    updateMoreUI();
  });

  $(".btn").on("click", function() {
    sendJSON(data);
  });
