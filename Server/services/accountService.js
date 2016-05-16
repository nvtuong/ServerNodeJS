var accountDAO = require('../database/accountDAO.js');
var accountCallback = require('../libs/accountCallback.js');
var libs = require('../libs/lib.js');

function getVerifyURL(userID) {
	var path = global.appRoot + "/api/verifyAccount/" + userID;
	console.log(path);
	return path;
}

module.exports.registerService = function(req, res) {
	console.log("register");
	accountDAO.registerAccount(req.body.name, req.body.email, req.body.password, req.body.defaultLatitude, req.body.defaultLongitude, function(err, result){
		accountCallback.registerCallback(res, err, result);
		if(!err) {
			var url = getVerifyURL(result.data[0]);
			libs.sendEmail(req.body.email, "Verify Account", "Please follow the bellow link to verify your account: " + url);
		}
	});
};

module.exports.loginService = function(req, res) {
	console.log("login");
	accountDAO.loginWithEmailAndPassword(req.body.email, req.body.password, function(err, result){
		accountCallback.loginCallback(res, err, result);
	});
};

module.exports.verifyAccountService = function(req, res) {
	console.log("verifyAccount");
	console.log(req.params.id);
	// update database!
}
