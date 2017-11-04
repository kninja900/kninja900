

// // receiving data from myScript.js
//   chrome.runtime.onMessage.addListener(
//    function(request, sender, sendResponse) {
//      // Not using sender or sendResponse but leaving in for troubleshooting
//      setJSON(request);
//    });

// function setJSON(data) {
//   jsonData = data;
//   console.log(jsonData);
// }

// function setJSON() {
//   chrome.storage.local.get(jsonData, function(result) {
//     json = result;
//   });
//   console.log(json);
// }

function getValue(callback) {
  chrome.storage.local.get(jsonData, callback);
}

// chrome.storage.local.get(jsonData, function(result) {
//   console.log("this is from the transfer file");
//   console.log(result);
//   var json = result;
// });

getValue(function (value) {
  console.log("getValue");
  console.log(value);
});

// document.getElementById('logo').addEventListener('click',function () {
//
//   document.getElementById('iType').textContent = "Baby";
//   document.getElementById('engRate').textContent = "Testing";

  // document.getElementById('iType').textContent = jsonData.influencerType;
  // document.getElementById('engRate').textContent = jsonData.engagement.engPerPost;
  // document.getElementById('avgFollow').textContent = jsonData.followers;
// });

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
