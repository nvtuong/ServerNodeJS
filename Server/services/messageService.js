var messageHelper = require('../libs/messageHelper.js');
var messageCallback = require('../libs/messageCallback.js');

module.exports.sendMessageService = function(req, res) {
	console.log("Send Message!");
	var targetUserID = req.body.targetID;
	// save message...
	var message = req.body.message;

	userDAO.getUserRegId(targetUserID, function(err, result){
		if(err) {
			res.status(404);
			res.send();
		}
		else {
			var regIDs = [result.data[0]];
			messageHelper.sendMessage(null, regIDs, message, function(err, result){
				messageCallback.sendMessageHelperCallback(res, err, result);
			});	
		}
	});
}