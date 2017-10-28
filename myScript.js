//TODO: Clean up comments and write real documentation on how this was executed at a later time -Erica

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
    "egagement" : {
      "followers" : "",
      "likeCommentRatio" : "",
      "perPost" : "",
      "Post" : ""
    }
  };

// userJson.user.media.nodes every image
//userJson.user.media.nodes.length is the size of the array
// userJson.user.media.nodes[i] object
//userJson.user.media.nodes[0].comments.count comment count
//userJson.user.media.nodes[0].likes.count like count
  function commentLikeRatio(userJson) {
    var sumRatios = 0;
    var nodes = userJson.user.media.nodes.length;
    for (i = 0; i < nodes; i++) {
      console.log(userJson.user.media.nodes[i].likes.count + "/" +
          userJson.user.media.nodes[i].comments.count+ "\n");
      sumRatios += userJson.user.media.nodes[i].likes.count / userJson.user.media.nodes[i].comments.count;
    }
    var avg = sumRatios/nodes;
      return avg;
  }
// Builds JSON object to display data
  function buildJSON() {
    if (onUserPage() && onInstagram()){
      var userJson = userJSON();
      var mediaJson = mediaJSON();
      if (mediaJSON()) {
        // analyze media here
      } else {
        console.log("There is no JSON object for /media");
      }

      if (userJson) {
        // analyze user here and update jsonData
        var email = extractEmails(userJson.user.biography);
        if (email) {
          jsonData.email = email;
        } else {
          // console.log("no email found in bio");
        }

        jsonData.id = userJson.user.id;
        jsonData.username = userJson.user.name;
        jsonData.fullname = userJson.user.full_name;
        jsonData.followers = userJson.user.followed_by.count;
        jsonData.following = userJson.user.follows.count;

        if (userJson.user.external_url) {
          jsonData.website = userJson.user.external_url;
        } else {
          // checking bio for url
          var website = extractWebsite(userJson.user.biography);
          if (website) {
            jsonData.website = website;
          } else {
            console.log("No Website");
          }
        }

      } else {
        console.log("There is no json at /?__a=1");
      }

      // Current data from user.  this is where we would update the popup.html
      console.log("You average " + commentLikeRatio(userJson) + " likes per comment.");
      console.log(jsonData);
      sendJSON(jsonData);
    }

  }

// checks if the user ison instagram.com
  function onInstagram() {
    if(window.location.href.indexOf("instagram.com") > -1) {
      // alert("you are on an instagram page when you refresh the page");
      return true;
    }
  }

// function for identifying if on user page
// how is this actually working?  can we make it more specific for user only?
  function onUserPage() {
    var exp = "instagram\.com\/([\.a-z0-9_-]+?)\/$";
    var regex = new RegExp(exp); //instagram.com/[user]/
    if (regex.test(window.location.href)){
        // alert("regex works, can put logic for recognizing an instagram user here");
        return true;
    }
  }

// Pulling getJSON for /media out so it can be reused
  function mediaJSON() {
    var json;
    // Using .ajax so that async can be set to false allowing for returning the json element from the function
    $.ajax({
      url: window.location.href + "media/",
      dataType: 'json', //data type received from server
      async: false, //set to false so that value can be returned
      success: function(data) {
        json = data
      }
    });
    return json;
  }

  function userJSON() {
    var json;
    // Using .ajax so that async can be set to false allowing for returning the json element from the function
    $.ajax({
      url: window.location.href + "?__a=1",
      dataType: 'json', //data type received from server
      async: false, //set to false so that value can be returned
      success: function(data) {
        json = data
      }
    });
    return json;
  }

// Scraping Email from Bio
  function extractEmails (bio)
  {
      return bio.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
  }

  function extractWebsite (bio)
  {
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
      url: window.location.href + "json",
      data: 'json',
      success: function(msg) {
        if (msg) {
          alert("sent");
        } else {
          alert("error");
        }
      }
    });
  }

  buildJSON();
  // This code will execute when elements are modified under the body element
  // update to title and DOMelement subtree
  $("body").bind("click", function() {
    buildJSON();
  });
