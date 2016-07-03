var messageHelper = require('./messageHelper.js');
var postDAO = require('../database/postDAO.js');

function responseBadRequest(response, err) {
	response.status(404);
	response.send(err);
}

function parsePostModel(data){
	var cols = ["postID", "content", "listImages", "Latitude", "Longitude", "postDate", 
		"feeling", "userName", "userAvatar", "relationShip", "numShare", "numLike", "numComment", "isYouLike", "userID"];
	var posts = [];
	for (var i = 0; i < data.length; i++){
		var item = data[i];
		var post = {};
		for (var col = 0; col < cols.length; col++) {
			post[cols[col]] = item[col];
		}
		posts.push(post);
	}
	return posts;
}

module.exports.getAllPostOfFriendsCallback = function(response, err, result) {
	if(err || result.data[0] == null) {
		console.log(err);
		responseBadRequest(response, err);
	}
	else {
		var posts = parsePostModel(result.data);
		response.status(200);
		response.send(posts);
	}
}

module.exports.getAllPostOfUserCallback = function(response, err, result) {
	if(err || result.data[0] == null)
		responseBadRequest(response, err);
	else {
		var posts = parsePostModel(result.data);
		response.status(200);
		response.send(posts);
	}
}

module.exports.likeThisPostCallBack = function(response, err, result) {
	if(err)
		responseBadRequest(response, err);
	else{
		var	regID = [result.data[0][0]];
		var targetID = result.data[0][1];
		var param = result.data[0][2];
		var content = "like";
		messageHelper.pushNotificationWithParam(content, param, regID, targetID, function (err ,result){
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

module.exports.unLikeThisPostCallBack = function(response, err, result) {
	console.log(result);
	if(err)
		responseBadRequest(response, err);
	else{
		response.status(200);
		response.send();
	}
}

module.exports.shareThisPostCallBack = function(response, err, result) {
	console.log("SHARE caLL BACK");
	console.log(result);
	if(err)
		responseBadRequest(response, err);
	else{
		var	regID = [result.data[0][0]];
		var targetID = result.data[0][1];
		var param = result.data[0][2];
		var content = "share";
		messageHelper.pushNotificationWithParam(content, param, regID, targetID, function (err ,result){
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

module.exports.createPostCallBack = function(response, err, result) {
	if(err || result.data[0] == null)
		responseBadRequest(response, err);
	else {
		response.status(200);
		response.send();
	}
}

module.exports.SearchPostCallback = function(response, err, result) {
	if(err || result.data[0] == null){
		console.log(err);
		responseBadRequest(response, err);
	}
	else {
		var posts = parsePostModel(result.data);
		response.status(200);
		response.send(posts);
	}
}

module.exports.SearchPostByDistanceCallback = function(response, err, result) {
	if(err || result.data[0] == null){
		console.log(err);
		responseBadRequest(response, err);
	}else {
		var posts = parsePostModel(result.data);
		response.status(200);
		response.send(posts);
	}
}

module.exports.getPostDetailCallback = function(response, err, result) {
	if(err || result.data[0] == null){
		console.log(err);
		responseBadRequest(response, err);
	}
	else {
		var posts = parsePostModel(result.data);
		response.status(200);
		response.send(posts[0]);
	}
}

module.exports.getAllPostOfTourCallback = function(response, err, result) {
	if(err || result.data[0] == null) {
		console.log(err);
		responseBadRequest(response, err);
	}
	else {
		var posts = parsePostModel(result.data);
		response.status(200);
		response.send(posts);
	}
}

module.exports.createNewPostOnTourCallBack = function(response, err, result) {
	if(err || result.data[0] == null) {
		console.log(err);
		responseBadRequest(response, err);
	}
	else {
		var posts = parsePostModel(result.data);
		response.status(200);
		response.send(posts[0]);
	}
}

module.exports.editPostCallBack = function(response, err, result) {
	if(err || result.data[0] == null) {
		console.log(err);
		responseBadRequest(response, err);
	}
	else {
		var posts = parsePostModel(result.data);
		response.status(200);
		response.send(posts[0]);
	}
}