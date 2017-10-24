chrome.runtime.sendMessage({ifInstagram : true}, function(response) {
    if(window.location.href.indexOf("instagram.com") > -1) {
        var exp = "instagram\.com\/([\.a-z0-9_-]+?)\/$";
        var regex = new RegExp(exp); //instagram.com/[user]/
        if (regex.test(window.location.href)){
            // alert("regex works, can put logic for recognizing an instagram user here");
            // calling mediaJSON function to console.log JSON element
            console.log("This is the JSON object from /media/");
            console.log(mediaJSON());
            console.log("This is the JSON object from /?__a=1");
            console.log(userJSON());
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
  // Need to replace static text with Bio from instagram API
  var bio = "this is a test mjsevey@gmail.com for the funcion, but what about second@email.com";

  function extractEmails (bio)
  {
      // Need to change console.log to return so that function can be called
      // and value returned from elsewhere in the code
      console.log("These are the emails that were extracted");
      console.log(bio.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi));

      // var emails = bio.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
      // var obj;
      // for (var i = 0; i < emails.length; i++) {
      //   if ($.isEmptyObject(obj)) {
      //     obj = {`email${i}`: emails[i]};
      //   } else {
      //
      //   }
      //
      // }
  }

  // Call extractEmails Function
  extractEmails(bio);

// Scraping URLs bioLinks
  // Need to replace this with the bio from the api
  var bioLinks = "I'm going to test this out to see if jneedle@bostonfinancial.com " +
  "and https://stackoverflow.com/questions/27916055/whats-the-meaning-of-gi-in-a-regex return as clickable links"

  function extractWebsite (bioLinks)
  {
    // Need to change console.log to return so that function can be called
    // and value returned from elsewhere in the code
	var foundSites = bioLinks.match(/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi);
	var websites = [];
	var regexVariable = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
	var regexTest = new RegExp(regexVariable); 
	var j = 0;
	for (var i = 0; i < foundSites.length; i++) {
		if (regexTest.test(foundSites[i]) == false) {
			websites[j] = foundSites[i];
			j = j + 1;
		}
	}
	
    console.log("These are the websites that were extracted");
	console.log(websites);
    //console.log(bioLinks.match(/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi));
	
  }

  extractWebsite(bioLinks);
