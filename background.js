chrome.runtime.onMessage.addListener(function(response, sender, sendResponse) {
    // alert('The extension loaded.');

    // Generates access token in new tabs
    var client_ID = '99c741452a6e4d84a1320831f3db56e1';
    // change redirect to mavrck to avoid loop
    var redirect_uri = 'http://www.mavrck.co/';
    var scope = 'public_content'
    // var url = 'https://api.instagram.com/oauth/authorize/?client_id='+ client_ID +
    //     '&redirect_uri='+ redirect_uri +'&response_type=token';
    var url = 'https://api.instagram.com/oauth/authorize/?client_id='+ client_ID +
        '&redirect_uri='+ redirect_uri +'&response_type=token&scope='+ scope;

    chrome.tabs.create({ "url": url, "index": 0 }, function(tab) {

      // this is evaluating to false
      if (tab.status == "complete") {
        alert(tab.url);

      }
    });
});
