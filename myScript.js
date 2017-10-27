//TODO: Clean up comments and write real documentation on how this was executed at a later time -Erica

// send JSON
  function sendJSON() {
    if (onUserPage() && onInstagram()){
      var user = userJSON();
      if (mediaJSON()) {
        console.log("This is the JSON object from /media/");
        console.log(mediaJSON());
      } else {
        console.log("There is no JSON object for /media");
      }
      if (user) {
        console.log("This is the JSON object from /?__a=1");
        console.log(user);
      } else {
        console.log("There is no json at /?__a=1");
      }
      var email = extractEmails(user.user.biography);
      if (email) {
        console.log("Email from bio: "+email);
      } else {
        console.log("no email found in bio");
      }
      if (user.user.external_url) {
        console.log("This is the website in the external_url");
        console.log(user.user.external_url);
        // dispaly or check bio for website and compare to email
      } else {
        var website = extractWebsite(user.user.biography);
        if (website) {
          console.log("This is the website in the bio");
          console.log(website);
        } else {
          console.log("No Website");
        }
      }
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

  function extractWebsite (bioLinks)
  {
  	var foundSites = bioLinks.match(/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi);
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

  sendJSON();

  // This code will execute when elements are modified under the body element
  // update to title and DOMelement subtree
  $("body").bind("click", function() {
    sendJSON();
  });
