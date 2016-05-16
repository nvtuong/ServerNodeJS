var commentDAO = require('../database/commentDAO.js');
var commentCallback = require('../libs/commentCallback.js');

module.exports.getAllCommentsOfPostService = function(req, res) {
	commentDAO.getAllCommentsOfPost(req.body.postID, function(err, result){
		commentCallback.getAllCommentsOfPostCallback(res, err, result);
	});
};

module.exports.createNewCommentOfPostService = function(req, res) {
	commentDAO.createNewCommentOfPost(req.body.postID, req.body.userID, req.body.content, req.body.day, function(err, result){
		commentCallback.createNewCommentOfPostCallBack(res, err, result);
	});
};