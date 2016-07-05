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
	postDAO.likeThisPost(req.body.userID, req.body.postID, req.body.day, function(err, result){
		postCallback.likeThisPostCallBack(res, err, result);
	});
};

module.exports.unLikeThisPostService = function(req, res) {
	postDAO.unLikeThisPost(req.body.userID, req.body.postID, function(err, result){
		postCallback.unLikeThisPostCallBack(res, err, result);
	});
};

module.exports.shareThisPostService = function(req, res) {
	postDAO.shareThisPost(req.body.userID, req.body.postID, req.body.day, function(err, result){
		postCallback.shareThisPostCallBack(res, err, result);
	});
};

module.exports.createPostService = function(req, res) {
	postDAO.createPost(req.body.postID, req.body.userID, req.body.content, req.body.date, 
			req.body.Latitude, req.body.Longitude, req.body.feeling, req.body.listImages,
			function(err, result){
					postCallback.createPostCallBack(res, err, result);
	});
};

module.exports.SearchPostService = function(req, res) {
	postDAO.SearchPost(req.body.userID, req.body.params, function(err, result) {
		postCallback.SearchPostCallback(res, err, result);
	});
};

module.exports.SearchPostByDistanceService = function(req,res) {
	postDAO.SearchPostByDistance(req.body.userID, req.body.Latitude, req.body.Longitude, 
		req.body.LatitudeUp, req.body.LatitudeDown, req.body.LongitudeRight, req.body.LongitudeLeft,
		function(err, result) {
		postCallback.SearchPostByDistanceCallback(res, err, result);
	});
};

module.exports.getPostDetailService = function(req, res) {
	postDAO.getPostDetail(req.body.userID, req.body.dataID, function(err, result) {
		postCallback.getPostDetailCallback(res, err, result);
	});
};

module.exports.getAllPostOfTourService = function(req, res) {
	postDAO.getAllPostOfTour(req.body.tourID, function(err, result) {
		postCallback.getAllPostOfTourCallback(res, err, result);
	});
};

module.exports.likeTourPostService = function(req, res) {
	postDAO.likeTourPost(req.body.userID, req.body.postID, req.body.day, function(err, result){
		postCallback.likeThisPostCallBack(res, err, result);
	});
};

module.exports.shareTourPostService = function(req, res) {
	postDAO.shareTourPost(req.body.userID, req.body.postID, req.body.day, function(err, result){
		postCallback.shareThisPostCallBack(res, err, result);
	});
};

module.exports.getPostTourDetailService = function(req, res) {
	postDAO.getPostTourDetail(req.body.userID, req.body.dataID, function(err, result) {
		postCallback.getPostDetailCallback(res, err, result);
	});
};

module.exports.createNewPostOnTourService = function(req, res) {
	postDAO.createNewPostOnTour(req.body.postID, req.body.tourID, req.body.content, req.body.date, 
			req.body.Latitude, req.body.Longitude, req.body.feeling, req.body.listImages,
			function(err, result){
					postCallback.createNewPostOnTourCallBack(res, err, result);
	});
};

module.exports.editPostService = function(req, res) {
	postDAO.editPost(req.body.postID, req.body.userID, req.body.content, req.body.date, 
			req.body.Latitude, req.body.Longitude, req.body.feeling, req.body.listImages,
			function(err, result){
					postCallback.editPostCallBack(res, err, result);
	});
};

module.exports.editPostTourService = function(req, res) {
	postDAO.editPostTour(req.body.postID, req.body.userID, req.body.content, req.body.date, 
			req.body.Latitude, req.body.Longitude, req.body.feeling, req.body.listImages,
			function(err, result){
					postCallback.editPostTourCallback(res, err, result);
	});
};