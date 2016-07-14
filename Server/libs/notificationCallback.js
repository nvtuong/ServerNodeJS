function responseBadRequest(response, err) {
	response.status(404);
	response.send(err);
}

function parseNotification(data) {
	var friends = [];
	for(var i = 0; i < data.length; i++) {
		var item = data[i];
		friends.push({userAvatar: item[1], userName: item[0], date: item[3], content: item[2], dataID: item[4]});
	}
	return friends;
}

module.exports.getUserNotificationCallback = function(response, err, result) {
	console.log("getUserNotificationCallback");
	if(err || result.data[0] == null){
		responseBadRequest(response, err);
	}
	else {
		console.log(result);
		var notification = parseNotification(result.data);
		response.status(200);
		response.send(notification);
	}
}

module.exports.makeNotificationPostCallback = function(response, err, result) {
	console.log("Notification Post Callback");
	if(err || result.data[0] == null){
		console.log(err);
		responseBadRequest(response, err);
	}
	else{
		console.log(result);
		response.status(200);
		response.send();
	}
}

module.exports.deleteNotificationCallback = function(response, err, result) {
	if(err){
		console.log(err);
		responseBadRequest(response, err);
	}
	else{
		console.log("delete notification ok");
		response.status(200);
		response.send();
	}
}


module.exports.loadStartNotificationCallback = function(response, err, result) {
	console.log("loadStartNotificationCallback");
	if(err || result.data[0] == null){
		responseBadRequest(response, err);
	}
	else {
		var data = result.data[0];
		var notification = {numMessage : data[0], numFriend : data[1], numNotification : data[2]};
		response.status(200);
		response.send(notification);
	}
}