// $.getScript("myScript.js", function() {
//
//   // alert("Loaded");
//
//   //
//   // if (buildJSON()) {
//   //   document.getElementById('iType').textContent = jsonData.influencerType;
//   //   document.getElementById('engRate').textContent = jsonData.engagement.engPerPost;
//   //   document.getElementById('avgFollow').textContent = jsonData.followers;
//   // }
//   //  // Updates Popup on clikc of logo
//   //  // Updates should be automatic
//   //  // This could be used to call sendJSON
//
// });

 document.getElementById('logo').addEventListener('click', function() {
  //  console.log("Logo click");
  //  console.log(jsonData);
  function getJSON() {
    var otherWindows = chrome.extension.getBackgroundPage();
    // otherWindows.buildJSON();
    console.log(otherWindows.returnJSON());
  }
  getJSON();
 });
