var options = {
	type: "basic",
	title: "Instagram",
	message: "You are on instagram.com",
	iconUrl: "icon.png"
};

chrome.notifications.create(options, callback);

console.log('Popup Done?');

function callback() {
	console.log("Popup done!");
}

