var userDAO = require('../database/userDAO.js');
var userCallback = require('../libs/userCallback.js');
var puid = require('../libs/lib.js');
var writingHelper = require('../libs/writingHelper.js');

/*
module.exports.getUserInforService = function(req, res ){
	userDAO.getUserInfor(req.body.userID, function(err, result) {
		userCallback.getUserInforCallback(res, err, result);
	});
};
*/

module.exports.getAllFriendsService = function(req, res) {
	userDAO.getAllFriends(req.body.userID, function(err, result) {
		userCallback.getAllFriendsCallback(res, err, result);
	});
};

module.exports.getSuggestFriendsService = function(req, res) {
	userDAO.getSuggestFriends(req.body.userID, function(err, result) {
		userCallback.getSuggestFriendsCallback(res, err, result);
	});
};

module.exports.updateProfileService = function(req, res) {
	console.log("updateProfile");
	var fileName;
	if(req.body.binaryImage) {
		fileName = puid.getUniqueID() + '.jpg';
		var path = global.appRoot + '/public/uploads/' + fileName;
		writingHelper.writeImage(path, req.body.binaryImage, function(err){
			if(err){
				console.log("Writing image Error!");
				res.status(404);
				res.send(err);
			}
		})
	}
	userDAO.updateUserProfile(req.body.userID, req.body.username, req.body.address, req.body.birthday, 
								req.body.gender, fileName, function(err, result) {
		userCallback.updateUserProfileCallback(res, err, result);
	});
};

module.exports.getProfileOfUserService = function(req, res) {
	userDAO.getProfileOfUser(req.body.userID, function(err, result){
		userCallback.getProfileOfUserCallBack(res, err, result);
	});
};

module.exports.searchFriendByEmailService = function(req, res) {
	userDAO.searchFriendByEmail(req.body.email, req.body.userID, function(err, result){
		userCallback.searchFriendByEmailCallBack(res, err, result);
	});
};

module.exports.getRequestFriendsService = function(req, res) {
	userDAO.getRequestFriends(req.body.userID, function(err, result){
		userCallback.getRequestFriendsCallBack(res, err, result);
	});
};

module.exports.deleteAddFriendRequestService = function(req, res) {
	console.log("deleteAddFriendRequest");
	userDAO.deleteAddFriendRequest(req.body.userID, req.body.friendID, function(err, result) {
		userCallback.deleteAddFriendRequestCallback(res, err, result);
	});
};

module.exports.deleteFriendService = function(req, res) {
	console.log("deleteFriend");
	userDAO.deleteFriend(req.body.userID, req.body.friendID, function(err, result) {
		userCallback.deleteFriendCallback(res, err, result);
	});
};

module.exports.addFriendService = function(req, res) {
	console.log("addFriend");
	userDAO.addFriend(req.body.userID, req.body.friendID, req.body.day, function(err, result) {
		userCallback.addFriendCallback(res, err, result);
	});
};

module.exports.confirmFriendRequestService = function(req, res) {
	console.log("confirmFriendRequest");
	userDAO.confirmFriendRequest(req.body.userID, req.body.friendID, req.body.day, function(err, result) {
		userCallback.confirmFriendRequestCallback(res, err, result);
	});
};

module.exports.updateRegistrationIDService = function(req, res) {
	console.log("updateRegistrationID");
	userDAO.updateRegistrationID(req.body.userID, req.body.regID, function(err, result){
		userCallback.updateRegistrationIDCallback(res, err, result);
	});
};

