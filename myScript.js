chrome.runtime.sendMessage({ifInstagram : true}, function(response) {
    if(window.location.href.indexOf("instagram.com") > -1) {
        var exp = "instagram\.com\/([\.a-z0-9_-]+?)\/$";
        var regex = new RegExp(exp); //instagram.com/[user]/
        if (regex.test(window.location.href)){
            alert("regex works, can put logic for recognizing an instagram user here");
            // calling mediaJSON function to console.log JSON element
            console.log(mediaJSON());
        }
        alert("you are on an instagram page when you refresh the page");
    }
});

// Pulling getJSON for /media out so it can be reused
function mediaJSON() {
  var json;
  // Using .ajax so that async can be set to false allowing for returning the
  // json element from the function
  $.ajax({
    url: window.location.href + "media/",
    dataType: 'json',
    async: false,
    // data: myData,  // unused right now.  leaving in for reference
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
    console.log(bio.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi));
}

// Call extractEmails Function
extractEmails(bio);

// Scraping URLs bioLinks

var bioLinks = "I'm going to test this out to see if youtube.com/RobLipsett and https://stackoverflow.com/questions/27916055/whats-the-meaning-of-gi-in-a-regex return as clickable links"


function extractWebsite (bioLinks)
{
  console.log(bioLinks.match(/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi));
}

extractWebsite(bioLinks);
