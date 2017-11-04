// Initalizing variables
  var jsonData;

// receiving data from myScript.js
  chrome.runtime.onMessage.addListener(
   function(request, sender, sendResponse) {
     // Not using sender or sendResponse but leaving in for troubleshooting
     setJSON(request);
     sendResponse();
     return true;
   });

function setJSON(data) {
  jsonData = data;
  console.log(jsonData);
}

document.getElementById('logo').addEventListener('click',function () {

  document.getElementById('iType').textContent = "Baby";
  document.getElementById('engRate').textContent = "Testing";
  if (jsonData) {
    document.getElementById('avgFollow').textContent = "jsonData.followers";

  }
  // document.getElementById('iType').textContent = jsonData.influencerType;
  // document.getElementById('engRate').textContent = jsonData.engagement.engPerPost;
  // document.getElementById('avgFollow').textContent = jsonData.followers;
});


// chrome.runtime.onConnect.addListener(function(port) {
//   console.assert(port.name == "knockknock");
//   port.onMessage.addListener(function(msg) {
//     if (msg.joke == "Knock knock") {
//       console.log(msg.joke);
//       port.postMessage({question: "Who's there?"});
//     }
//     else if (msg.answer == "Madame") {
//       console.log(msg.answer);
//       port.postMessage({question: "Madame who?"});
//     }
//     else if (msg.answer == "Madame... Bovary") {
//       console.log(msg.answer);
//       port.postMessage({question: "I don't get it."});
//     }
//   });
// });
