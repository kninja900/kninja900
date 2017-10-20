chrome.runtime.sendMessage({ifInstagram : true}, function(response) {
    if(window.location.href.indexOf("instagram.com") > -1) {
        var exp = "instagram\.com\/([\.a-z0-9_-]+?)\/$";
        var regex = new RegExp(exp); //instagram.com/[user]/
        if (regex.test(window.location.href)){
            alert("regex works, can put logic for recognizing an instagram user here");
            $.getJSON(window.location.href + "media/", function(data) {
                //data is the JSON string
                console.log("getJSON working. JSON Data: ");
                //Check console, you'll see the data from the JSON on the instagram.com/[user]/media/ show up
                console.log(data);
            });

        }
        alert("you are on an instagram page when you refresh the page");
    }
});

// Scraping Email from Bio
// Need to replace static text with Bio from instagram API
var bio = "this is a test mjsevey@gmail.com for the funcion"

function extractEmails (bio)
{
    // Need to change console.log to return so that function can be called
    // and value returned from elsewhere in the code
    console.log(bio.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi));
}

// Call extractEmails Function
extractEmails(bio);
