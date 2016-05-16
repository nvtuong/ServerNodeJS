var accountDAO = require('../database/accountDAO.js');
var accountCallback = require('../libs/accountCallback.js');

module.exports.registerService = function(req, res) {
	console.log("register");
	accountDAO.registerAccount(req.body.name, req.body.email, req.body.password, req.body.defaultLatitude, req.body.defaultLongitude, function(err, result){
		accountCallback.registerCallback(res, err, result);
	});
};

module.exports.loginService = function(req, res) {
	console.log("login");
	accountDAO.loginWithEmailAndPassword(req.body.email, req.body.password, function(err, result){
		accountCallback.loginCallback(res, err, result);
	});
};

