var messageHelper = require('./messageHelper.js');
var postDAO = require('../database/postDAO.js');

function responseBadRequest(response, err) {
	response.status(404);
	response.send(err);
}

function parsePostModel(data){
	var cols = ["postID", "content", "listImages", "Latitude", "Longitude", "postDate", 
		"feeling", "userName", "userAvatar", "relationShip", "numShare", "numLike", "numComment", "isYouLike", "tag"];
	var posts = [];
	for (var i = 0; i < data.length; i++){
		var item = data[i];
		var post = {};
		for (var col = 0; col < cols.length - 1; col++) {
			post[cols[col]] = item[col];
		}
		var tags = item[cols.length - 1];
		var stringTags = "";
		for (var tag = 0; tag < tags.length; tag++)
			stringTags += tags[tag] + ",";
		if (stringTags.length == 0)
			stringTags = "No Tag ";
		stringTags = stringTags.slice(0, stringTags.length - 1);
		stringTags = stringTags.replace(/,/g, ", ");
		post["tag"] = stringTags;
		posts.push(post);
	}
	return posts;
}

module.exports.getAllPostOfFriendsCallback = function(response, err, result) {
	console.log(result);
	if(err || result.data[0] == null)
		responseBadRequest(response, err);
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
console.log(result);
	if(err)
		responseBadRequest(response, err);
	else{
		response.status(200);
		response.send();
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
	console.log(result);
	if(err)
		responseBadRequest(response, err);
	else{
		response.status(200);
		response.send();
	}
}

module.exports.createPostCallBack = function(response, err, result) {
	console.log(result);
	if(err || result.data[0] == null)
		responseBadRequest(response, err);
	else {
		var userID = result.data[0][15];
		postDAO.getRegIDofFriend(userID, function(err, result){
			if (result){
				var content = "home";
				var regID  = result.data[0];
				messageHelper.pushNotification(content, regID, function (err ,result){
					
				});
			}
		});
		var post = parsePostModel(result.data)
		response.status(200);
		response.send(post[0]);
	}
}

module.exports.SearchPostCallback = function(response, err, result) {
	console.log(result);
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
	console.log(result);
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
	console.log(result);
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