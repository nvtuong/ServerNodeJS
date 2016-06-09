var userDAO = require('../database/userDAO');
var messageHelper = require('./messageHelper.js');

function responseBadRequest(response, err) {
	response.status(404);
	response.send(err);
}


module.exports.sendMessageHelperCallback = function(response, err, result) {
	console.log(result);
	if(err)
		responseBadRequest(response, err);
	else {
		response.status(200);
		response.send();
	}
}

function parseMessageModel(data) {
	var messages = [];
	for (var i = 0; i < data.length; i ++) {
		var temp = data[i];
		var message = {};
		message["senderID"] = temp[0];
		message["senderName"] = temp[1];
		message["senderAvatar"] = temp[2];
		message["date"] = temp[3];
		message["message"] = temp[4];
		messages.push(message);
	}
	return messages;
}

module.exports.getAllMessagesCallback = function(response, err, result) {
	console.log(result);
	if(err)
		responseBadRequest(response, err);
	else {
		var messages = parseMessageModel(result.data);
		response.status(200);
		response.send(messages);
	}
}

module.exports.getMessageOfUserCallback = function(response, err, result) {
	console.log(result);
	if(err){
		responseBadRequest(response, err);
	}
	else {
		var messages = parseMessageModel(result.data);
		response.status(200);
		response.send(messages);
	}
}

module.exports.loadOneMessageOfUserCallback = function(response, err, result){
	console.log(result);
	if(err)
		responseBadRequest(response, err);
	else {
		var messages = parseMessageModel(result.data);
		response.status(200);
		response.send(messages[0]);
	}
}



module.exports.sendMessageToUserCallback = function(response, senderID, targetID, err, result) {
	console.log(result);
	if(err)
		responseBadRequest(response, err);
	else {
		userDAO.getUserRegId(targetID, function(err, result) {
			if(err) {
				responseBadRequest(response, err);
			}
			else {
				var regID = result.data;
				var content = "message"
				messageHelper.pushNotificationWithParam(content, senderID, regID, targetID, function(err, result){
					if(err) {
						responseBadRequest(response, err);
					}
					else {
						response.status(200);
						response.send();
					}
				});
			}
		});
	}
}
