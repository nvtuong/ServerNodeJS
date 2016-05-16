var messageHelper = require('./messageHelper.js');

function responseBadRequest(response, err) {
	response.status(404);
	response.send(err);
}

module.exports.getUserInforCallback = function(response, err, result) {
	if(err) 
		responseBadRequest(response, err);
	else {
		response.status(200);
		response.send(result.data[0]);
	}
}

function parseFriendModel(data) {
	var friends = [];
	for(var i = 0; i < data.length; i++) {
		var item = data[i];
		friends.push({id: item[0], name: item[1], avatar: item[2], numFriend: item[3], mutualFriend: item[4]});
	}
	return friends;
}

module.exports.getAllFriendsCallback = function(response, err, result) {
	console.log(result);
	if(err || result.data[0] == null)
		responseBadRequest(response, err);
	else {
		var friends = parseFriendModel(result.data);
		response.status(200);
		response.send(friends);
	}
}

module.exports.getSuggestFriendsCallback = function(response, err, result) {
	if(err || result.data[0] == null)
		responseBadRequest(response, err);
	else {
		var friends = parseFriendModel(result.data);
		response.status(200);
		response.send(friends);
	}
}

module.exports.updateUserProfileCallback = function(response, err, result) {
	if(!err) {
		console.log(result);
		var data = result.data[0];
		var res = {};
		res.name = data[0];
		res.avatar = data[1];
		res.address = data[2];
		res.birthday = data[3];
		res.gender = data[4];
		var json = JSON.stringify(res);
		response.status(200);
		response.send(json);
	}
	else {
		responseBadRequest(response, err);
	}
}


function parseProfileModel(result) {
	var data = result.data[0];
	var res = {};
	res.avatar = data[0];
	res.name = data[1];
	res.gender = data[2];
	res.birthday = data[3];
	res.address = data[4];
	res.email = data[5];
	res.numFriend = data[6];
	res.numPost = data[7];
	res.numFollow = data[8];
	var json = JSON.stringify(res);
	return json;
}


module.exports.getProfileOfUserCallBack = function(response, err, result) {
	if(err)
		responseBadRequest(response, err);
	else {
		console.log(result);
		var json = parseProfileModel(result);
		response.status(200);
		response.send(json);
	}
}


function parseONEFriendModel(result) {
	var data = result.data[0];
	var res = {};
	res.id = data[0];
	res.avatar = data[1];
	res.name = data[2];
	res.numFriend = data[3];
	res.mutualFriend = data[4];
	res.isFriend = data[5];
	var json = JSON.stringify(res);
	return json;
}
module.exports.searchFriendByEmailCallBack = function(response, err, result) {
	console.log(result);
	if(err || result.data[0] == null)
		responseBadRequest(response, err);
	else {
		console.log(result);
		var json = parseONEFriendModel(result);
		response.status(200);
		response.send(json);
	}
}

module.exports.getRequestFriendsCallBack = function(response, err, result) {
	console.log(result);
	if(err || result.data[0] == null)
		responseBadRequest(response, err);
	else {
		var friends = parseFriendModel(result.data);
		response.status(200);
		response.send(friends);
	}
}

module.exports.deleteAddFriendRequestCallback = function(response, err, result) {
	console.log("deleteAddFriendRequestCallback");
	if(err)
		responseBadRequest(response, err);
	else {
		response.status(200);
		response.send();
	}
}


module.exports.deleteFriendCallback = function(response, err, result) {
	console.log("deleteFriendCallback");
	if(err)
		responseBadRequest(response, err);
	else {
		response.status(200);
		response.send();
	}
}

module.exports.addFriendCallback = function(response, err, result) {
	console.log("addFriendCallback");
	if(err){
		console.log(err);
		responseBadRequest(response, err);
	}
	else {
		var regID = result.data;		
		console.log(regID)
		var content = "add";
		messageHelper.pushNotification(content, regID, function (err ,result){
			if(err){
				console.log(err);
				responseBadRequest(response, err);
			}
			else{
				response.status(200);
				response.send();
			}
		});
	}
}

module.exports.confirmFriendRequestCallback = function(response, err, result) {
	console.log("confirmFriendRequestCallback");
	if(err){
		console.log(err);
		responseBadRequest(response, err);
	}
	else {
		var regID = result.data;		
		console.log(regID)
		var content = "confirm";
		messageHelper.pushNotification(content, regID, function (err ,result){
			if(err){
				console.log(err);
				responseBadRequest(response, err);
			}
			else{
				response.status(200);
				response.send();
			}
		});
	}
}

module.exports.updateRegistrationIDCallback = function(response, err, result) {
	console.log(result);
	if(err)
		responseBadRequest(response, err);
	else {
		response.status(200);
		response.send();
	}
}