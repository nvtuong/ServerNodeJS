var messageHelper = require('../libs/messageHelper.js');
var messageCallback = require('../libs/messageCallback.js');
var messageDAO = require('../database/messageDAO.js');

module.exports.sendMessageService = function(req, res) {
	console.log("Send Message!");
	var targetUserID = req.body.targetID;
	// save message...
	var message = req.body.message;

	userDAO.getUserRegId(targetUserID, function(err, result){
		if(err) {
			res.status(404);
			res.send();
		}
		else {
			var regIDs = [result.data[0]];
			messageHelper.sendMessage(null, regIDs, message, function(err, result){
				messageCallback.sendMessageHelperCallback(res, err, result);
			});	
		}
	});
}

module.exports.getAllMessages = function(req, res) {
	console.log("get All Messages");
	var fromUserID = req.body.userID;
	messageDAO.getAllMessages(fromUserID, function(err, result) {
		messageCallback.getAllMessagesCallback(res, err, result);
	});
}

module.exports.getMessageOfUser = function(req, res) {
	console.log("load Message");
	var userID = req.body.userID;
	var targetID = req.body.targetUserID;
	var skip = req.body.skip;
	messageDAO.getMessageOfUser(userID, targetUserID, skip, function(err, result) {
		messageCallback.getMessageOfUserCallback(res, err, result);
	})
}

module.exports.sendMessageToUser = function(req, res) {
	console.log("send Message to user");
	var senderID = req.body.fromUserID;
	var targetID = req.body.toUserID;
	var message = req.body.message;
	var date = req.body.date;
	messageDAO.sendMessageToUser(senderID, targetID, message, data, function(err, result) {
		messageCallback.sendMessageToUserCallback(res, err, targetID, message, result);
	});
}