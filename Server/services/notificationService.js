var notificationDAO = require('../database/notificationDAO.js');
var notificationCallback = require('../libs/notificationCallback.js');

module.exports.getUserNotificationService = function(req, res) {
	notificationDAO.getUserNotification(req.body.userID, function(err, result) {
		notificationCallback.getUserNotificationCallback(res, err, result);
	});
};

module.exports.makeNotificationPostService = function(req, res) {
	notificationDAO.makeNotificationPost(req.body.userID, req.body.Latitude, req.body.Longitude,
	req.body.LatitudeUp, req.body.LatitudeDown, req.body.LongitudeRight, req.body.LongitudeLeft,
	req.body.day, function(err, result) {
		notificationCallback.makeNotificationPostCallback(res, err, result);
	});
};

module.exports.deleteNotificationService = function(req, res) {
	notificationDAO.deleteNotification(req.body.userID, req.body.dataID, function(err, result) {
		notificationCallback.deleteNotificationCallback(res, err, result);
	});
};

module.exports.loadStartNotificationService = function(req, res) {
	notificationDAO.loadStartNotification(req.body.userID, function(err, result) {
		notificationCallback.loadStartNotificationCallback(res, err, result);
	});
};