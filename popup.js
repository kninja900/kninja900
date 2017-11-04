

  //   document.getElementById('iType').textContent = jsonData.influencerType;
  //   document.getElementById('engRate').textContent = jsonData.engagement.engPerPost;
  //   document.getElementById('avgFollow').textContent = jsonData.followers;

   // Updates Popup on clikc of logo
   // Updates should be automatic
   // This could be used to call sendJSON



 // receiving data from myScript.js
 chrome.runtime.onMessage.addListener(
   function(request, sender, sendResponse) {
     console.log(sender.tab ?
                 "from a content script:" + sender.tab.url :
                 "from the extension");
     console.log(request);
     if (request)
       sendResponse({farewell: "goodbye"});
   });
