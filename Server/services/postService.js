var postDAO = require('../database/postDAO.js');
var postCallback = require('../libs/postCallback.js');

module.exports.getAllPostOfFriendsService = function(req, res) {
	postDAO.getAllPostOfFriends(req.body.userID, function(err, result) {
		postCallback.getAllPostOfFriendsCallback(res, err, result);
	});
};

module.exports.getAllPostOfUserService = function(req, res) {
	postDAO.getAllPostAndSharedOfUser(req.body.userID, function(err, result) {
		postCallback.getAllPostOfUserCallback(res, err, result);
	});
};

module.exports.likeThisPostService = function(req, res) {
	postDAO.likeThisPost(req.body.userID, req.body.postID, function(err, result){
		postCallback.likeThisPostCallBack(res, err, result);
	});
};

module.exports.unLikeThisPostService = function(req, res) {
	postDAO.unLikeThisPost(req.body.userID, req.body.postID, function(err, result){
		postCallback.unLikeThisPostCallBack(res, err, result);
	});
};

module.exports.shareThisPostService = function(req, res) {
	postDAO.shareThisPost(req.body.userID, req.body.postID, function(err, result){
		postCallback.shareThisPostCallBack(res, err, result);
	});
};

module.exports.createPostService = function(req, res) {
	console.log("createPost");
	postDAO.createPost(req.body.postID, req.body.userID, req.body.content, req.body.date, 
			req.body.Latitude, req.body.Longitude, req.body.feeling, req.body.listImages,
			req.body.tag, function(err, result){
					postCallback.createPostCallBack(res, err, result);
	});
};

module.exports.SearchPostService = function(req, res) {
	postDAO.SearchPost(req.body.userID, req.body.params, function(err, result) {
		postCallback.SearchPostCallback(res, err, result);
	});
};

module.exports.SearchPostByDistanceService = function(req,res) {
	postDAO.SearchPostByDistance(req.body.userID, req.body.Latitude, req.body.Longitude, req.body.distance, function(err, result) {
		postCallback.SearchPostByDistanceCallback(res, err, result);
	});
};

module.exports.getPostDetailService = function(req, res) {
	postDAO.getPostDetail(req.body.userID, req.body.dataID, function(err, result) {
		postCallback.getPostDetailCallback(res, err, result);
	});
};


