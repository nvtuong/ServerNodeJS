var gcm = require('node-gcm');
var apiKey = "AIzaSyCV2tW1Nxkpm-e5kyKczvBbFPU0rb4VUcY"

module.exports.sendMessage = function(user, regIDs, content, callback) {
	var message = new gcm.Message();
	message.addData('title', 'Message');
	message.addData('message', content);
	var sender = new gcm.Sender(apiKey);
	sender.send(message, {registrationTokens: regIDs}, function(err, result){
		callback(err, result);
	})
}