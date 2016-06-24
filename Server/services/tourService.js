var tourDAO = require('../database/tourDAO.js');
var tourCallback = require('../libs/tourCallback.js');

module.exports.createTourService = function(req, res) {
	tourDAO.createTour(req.body.userID, req.body.content, req.body.date,
			req.body.startLatitude, req.body.startLongitude, function(err, result){
		tourCallback.createTourCallback(res, err, result);
	});
};

module.exports.createPostOnTourService = function(req, res) {
	tourDAO.createPostOnTour(req.body.tourID, req.body.content, req.body.date,
			req.body.startLatitude, req.body.startLongitude, function(err, result){
		tourCallback.createPostOnTourCallback(res, err, result);
	});
};

module.exports.stopTourLiveService = function(req, res) {
	tourDAO.stopTourLive(req.body.tourID, function(err, result){
		tourCallback.stopTourLiveCallback(res, err, result);
	});
};

module.exports.getAllLiveTourService = function(req, res) {
	tourDAO.getAllLiveTour(req.body.userID, function(err, result){
		tourCallback.getAllLiveTourCallback(res, err, result);
	});
};

module.exports.getAllMyTourService = function(req, res) {
	tourDAO.getAllMyTour(req.body.userID, function(err, result){
		tourCallback.getAllMyTourCallback(res, err, result);
	});
};