function responseBadRequest(response, err) {
	response.status(404);
	response.send(err);
}

module.exports.loginCallback = function(response, err, result) {
	console.log(result);
	if(err || result.data[0] == null)
		responseBadRequest(response, err);
	else {
		response.status(200);
		response.send(result.data[0]);
	}
}

module.exports.registerCallback = function(response, err, result) {
	if(err)
		responseBadRequest(response, err);
	else {
		response.status(200);
		response.send(result.data[0]);
	}
}