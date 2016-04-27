function parseLoginModel(result) {
	var data = result.data[0];
	var res = {};
	res.id = data[0];
	res.name = data[1];
	res.avatar = data[2];
	var json = JSON.stringify(res);
	return json;
}

function responseBadRequest(response, err) {
	response.status(404);
	response.send(err);
}


module.exports.loginCallback = function(response, err, result) {
	console.log(result);
	if(err || result.data[0] == null)
		responseBadRequest(response, err);
	else {
		var json = parseLoginModel(result);
		response.status(200);
		response.type('application/json');
		response.send(json);
	}
}

module.exports.registerCallback = function(response, err, result) {
	if(err)
		responseBadRequest(response, err);
	else {
		response.status(200);
		response.send(result.data[0]);
	}
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

function parsePostModel(data){
	var cols = ["postID", "content", "listImages", "Latitude", "Longitude", "postDate", 
		"feeling", "userName", "userAvatar", "relationShip", "numShare", "numLike", "numComment", "isYouLike", "tag"];
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

function parseCommentModel(data) {
	var comments = [];
	var cols = ["id", "content", "commentDate", "userID", "userName", "userAvatar"];
	for (var i = 0; i < data.length; i++) {
		var item = data[i];
		var comment = {};
		for (var col = 0; col < cols.length; col++){
			comment[cols[col]] = item[col]; 
		}
		comments.push(comment);
	}
	return comments;
}

module.exports.getAllCommentsOfPostCallback = function(response, err, result) {
	if(err || result.data[0] == null)
		responseBadRequest(response, err);
	else {
		console.log(result);
		var comments = parseCommentModel(result.data);
		response.status(200);
		response.send(comments);
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

function parseONECommentModel(result) {
	var data = result.data[0];
	var res = {};
	res.id = data[0];
	res.content = data[1];
	res.commentDate = data[2];
	res.userID = data[3];
	res.userName = data[4];
	res.userAvatar = data[5];
	var json = JSON.stringify(res);
	return json;
}

module.exports.createNewCommentOfPostCallBack = function(response, err, result) {
	if(err)
		responseBadRequest(response, err);
	else {
		console.log(result);
		var comments = parseONECommentModel(result);
		response.status(200);
		response.send(comments);
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