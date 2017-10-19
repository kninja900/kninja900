chrome.runtime.sendMessage({ifInstagram : true}, function(response) {
    if(window.location.href.indexOf("instagram.com") > -1) {
        // var expression = /(instagram.com\/)([a-z0-9_-])/;
        var regex = new RegExp(/(instagram.com\/)([a-z0-9_-])/);
        if (regex.test(window.location.href)){
            alert("regex works, can put logic for recognizing an instagram user here");
        }
        alert("you are on an instagram page when you refresh the page");
    }
});

//chrome.runtime.sendMessage(document.getElementsByTagName("title")[0].innerText + ". You can run the extension off of this page");
