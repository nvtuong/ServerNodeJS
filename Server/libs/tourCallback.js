function responseBadRequest(response, err) {
	response.status(404);
	response.send(err);
}

module.exports.createTourCallback = function(response, err, result) {
	console.log("createTourS Callback");	
	if(err) {
		console.log(err);
		responseBadRequest(response, err);
	}
	else {
		response.status(200);
		response.send(result.data[0]);
	}
}

module.exports.createPostOnTourCallback = function(response, err, result) {
	console.log("createPostOnTour call back");
	if(err) 
		responseBadRequest(response, err);
	else {
		response.status(200);
		response.send();
	}
}

module.exports.stopTourLiveCallback = function(response, err, result) {
	console.log("stopTourLive call back");
	if(err) 
		responseBadRequest(response, err);
	else {
		response.status(200);
		response.send();
	}
}

function parseTourModel(data){
	var cols = ["id", "status", "userName", "userAvatar", "numPlaces",
		"startDate", "startLatitude", "startLongitude", "startNumComment", "startNumShare", "startNumLike",
		"stopDate", "stopLatitude", "stopLongitude", "stopNumComment", "stopNumShare", "stopNumLike"];
	var posts = [];
	for (var i = 0; i < data.length; i++){
		var item = data[i];
		var post = {};
		for (var col = 0; col < cols.length - 1; col++) {
			post[cols[col]] = item[col];
		}
		posts.push(post);
	}
	return posts;
}


module.exports.getAllLiveTourCallback = function(response, err, result) {
	console.log("getAllLiveTour call back");
	if(err || result.data[0] == null) 
		responseBadRequest(response, err);
	else {
		var tours = parseTourModel(result.data);
		response.status(200);
		response.send(tours);
	}
}

module.exports.getAllMyTourCallback = function(response, err, result) {
	console.log("getAllMyTour call back");
	if(err || result.data[0] == null) {
		responseBadRequest(response, err);
		console.log(err);
	}
	else {
		var tours = parseTourModel(result.data);
		response.status(200);
		response.send(tours);
	}
}