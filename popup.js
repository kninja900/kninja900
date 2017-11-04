

function getValue(callback) {
  chrome.storage.local.get(jsonData, callback);
}


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
