function responseBadRequest(response, err) {
	response.status(404);
	response.send(err);
}


module.exports.sendMessageHelperCallback = function(response, err, result) {
	console.log(result);
	if(err)
		responseBadRequest(response, err);
	else {
		response.status(200);
		response.send();
	}
}

