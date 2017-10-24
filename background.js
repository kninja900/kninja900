chrome.runtime.onMessage.addListener(function(response, sender, sendResponse) {
    console.log(getAccessToken());
});


//Auth
//chrome.identity.launchWebAuthFlow({ url: "https://api.instagram.com/oauth/authorize/?client_id=CLIENT-ID&redirect_uri=REDIRECT-URI&response_type=token" },
// someFunction)
function getAccessToken() {
    var CLIENT_ID = '99c741452a6e4d84a1320831f3db56e1';
    // var REDIRECT_URI = 'https://www.instagram.com/';
    var REDIRECT_URI = chrome.identity.getRedirectURL(); // https://developer.chrome.com/extensions/identity
    var authUri = 'https://api.instagram.com/oauth/authorize/?client_id='+ CLIENT_ID +
        '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) + '&response_type=token';

    chrome.identity.launchWebAuthFlow({url: authUri, interactive: true},
        function(responseUrl) {
            console.log(responseUrl);
            var accessToken = responseUrl.substring(responseUrl.indexOf("=") + 1);
            console.log(accessToken);
        });
}
