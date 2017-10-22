chrome.runtime.sendMessage({ifInstagram : true}, function(response) {
    if(window.location.href.indexOf("instagram.com") > -1) {
        var exp = "instagram\.com\/([\.a-z0-9_-]+?)\/$";
        var regex = new RegExp(exp); //instagram.com/[user]/
        if (regex.test(window.location.href)){
            // alert("regex works, can put logic for recognizing an instagram user here");
            // calling mediaJSON function to console.log JSON element
            console.log("This is the JSON object from /media/");
            console.log(mediaJSON());
        }
        // alert("you are on an instagram page when you refresh the page");
    }
});

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

// Scraping Email from Bio
  // Need to replace static text with Bio from instagram API
  var bio = "this is a test mjsevey@gmail.com for the funcion, but what about second@email.com";

  function extractEmails (bio)
  {
      // Need to change console.log to return so that function can be called
      // and value returned from elsewhere in the code
      console.log("These are the emails that were extracted");
      console.log(bio.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi));
  }

  // Call extractEmails Function
  extractEmails(bio);

// Scraping URLs bioLinks
  // Need to replace this with the bio from the api
  var bioLinks = "I'm going to test this out to see if youtube.com/RobLipsett " +
  "and https://stackoverflow.com/questions/27916055/whats-the-meaning-of-gi-in-a-regex return as clickable links"

  function extractWebsite (bioLinks)
  {
    // Need to change console.log to return so that function can be called
    // and value returned from elsewhere in the code
    console.log("These are the websites that were extracted");
    console.log(bioLinks.match(/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi));
  }

  extractWebsite(bioLinks);

// Generating access token
  // Is there a way to better store this variables so they are not hard coded in the code?
  var client_ID = '99c741452a6e4d84a1320831f3db56e1';
  var redirect_uri = 'https://www.instagram.com/';

  // Access the client id and redirect uri to build the url http request
  function accessToken(clientID, redirectURI) {
    var at;
    // Using .ajax so that async can be set to false allowing for returning the json element from the function
    $.ajax({
      type: 'GET',
      url: 'https://api.instagram.com/oauth/authorize/?client_id='+ clientID +
          '&redirect_uri='+ redirectURI +'&response_type=token',
      // data: 'json', //date type sent to the server
      dataType: 'html', //data type expected back from server
      async: true, //needs to be true to try and access different URL - get CORS error
      cache: false,
      // data: myData,  // unused right now.  leaving in for reference
      success: function(data) {
        console.log("This is the success response from accessToken");
        console.log("Data from within accessToken");
        at = data;
      },
      error: function(data) {
        console.log("There was an error with accessToken");
        console.log(data);
      }
    });
    return at;
  }

  console.log("Here is the data from accessToken");
  console.log(accessToken(client_ID, redirect_uri));
