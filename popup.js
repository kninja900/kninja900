
// Updates Popup on clikc of logo
// Updates should be automatic
// This could be used to call sendJSON
document.getElementById('logo').addEventListener('click', function() {
  document.getElementById('iType').textContent = "influencerType";
  document.getElementById('engRate').textContent = "Engage rate";
  document.getElementById('avgFollow').textContent = "Avg Follower";
});
