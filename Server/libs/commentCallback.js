var messageHelper = require('./messageHelper.js'); 

function responseBadRequest(response, err) {
	response.status(404);
	response.send(err);
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
	console.log("createNewCommentOfPostCallBack");
	if(err){
		console.log(err);
		responseBadRequest(response, err);
	}
	else {
		console.log(result);
		var content = "comment";
		var param = result.data[0][1];

		var has = false;
		var listRegID = result.data[0][3];
		for (var i = 0; i < listRegID.length; ++i){
			if (listRegID[i] == result.data[0][0]) {
				has = true;
			};
		}
		if (has == false) {
			listRegID.push(result.data[0][0]);
		};

		var listID = result.data[0][2];	
		var strIDs = result.data[0][4];
		for (var i = 0; i < listID.length; i++) 
			strIDs += listID[i] + " ";

		messageHelper.pushNotificationWithParam(content, param, listRegID, strIDs, function (err ,result){
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

module.exports.getLastCommentOfPostCallback = function(response, err, result) {
	if(err || result.data[0] == null)
		responseBadRequest(response, err);
	else {
		console.log(result);
		var comments = parseONECommentModel(result);
		response.status(200);
		response.send(comments);
	}
}