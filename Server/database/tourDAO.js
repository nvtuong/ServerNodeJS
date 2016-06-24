var database = require('./database.js');
var puid = require('../libs/lib.js');

module.exports.createTour = function(userID, content, date, startLatitude, startLongitude, callback) {
	var tourID = puid.getUniqueID();
	var postID = puid.getUniqueID();
	var query = "match (u:User{id : '" + userID + "'}) create (u) - [:TOUR] - > (t:Tour{id : '" + tourID + "', "
	    + " status : 1, startID : '" + postID + "', stopID : '" + postID + "'}) "
		+ " - [:HAS_POST] -> (p:Post{id : '" + postID + "', Latitude : " + startLatitude + ", Longitude : " + startLongitude + ", "
		+ " content : '" + content + "', day : '" + date + "'}) return t.id";
	database.runCypherQuery(query, null, callback);
}

module.exports.createPostOnTour = function(tourID, content, date, startLatitude, startLongitude, callback) {
	var postID = puid.getUniqueID();
	var query = "match (t:Tour{id : '" + tourID + "'}) set t.stopID = '" + postID + "' "
		+ " create (t) - [:HAS_POST] -> (p:Post{id : '" + postID + "', Latitude : " + startLatitude + ", Longitude : " + startLongitude + ", "
		+ " content : '" + content + "', day : '" + date + "'})";
	database.runCypherQuery(query, null, callback);
}

module.exports.stopTourLive = function(tourID, callback) {
	var query = "match (t:Tour{id : '" + tourID + "'}) set t.status = 0";
	database.runCypherQuery(query, null, callback);
}

module.exports.getAllLiveTour = function(userID, callback) {
	var query = "match (u:User{id : '" + userID + "'}) - [:FRIEND] -> (f:User) - [:TOUR] -> (t:Tour{status = 1}) - [h:HAS_POST] -> (p:Post) "
			+ " with f.name as name, f.avatar as avatar, count (distinct h) as numPlaces, t.id as id, t.startID as startID, t.stopID as stopID "
			+ " match (start:Post{id : startID}), (stop:Post{id : stopID}) "
			+ " optional match (start) - [h1:HAS_COMMENT] - (c1:Comment) optional match (start) - [s1:SHARE] - (u1:User) optional match (start) - [l1:LIKE] - (u11:User) "
			+ " optional match (stop) - [h2:HAS_COMMENT] - (c2:Comment) optional match (stop) - [s2:SHARE] - (u2:User) optional match (stop) - [l2:LIKE] - (u22:User) "
			+ " return id, 1, name, avatar, numPlaces, start.day, start.Latitude, start.Longitude, count (distinct c1), count (distinct s1), count (distinct l1), stop.day, stop.Latitude, stop.Longitude, count (distinct c2), count (distinct s2), count (distinct l2) order by start.day DESC";
	database.runCypherQuery(query, null, callback);
}

module.exports.getAllMyTour = function(userID, callback) {
	var query = "match (u:User{id : '" + userID + "'}) - [:TOUR] -> (t:Tour) - [h:HAS_POST] -> (p:Post) "
			+ " with u.name as name, u.avatar as avatar, count (distinct h) as numPlaces, t.id as id, t.status as status, t.startID as startID, t.stopID as stopID "
			+ " match (start:Post{id : startID}), (stop:Post{id : stopID}) "
			+ " optional match (start) - [h1:HAS_COMMENT] - (c1:Comment) optional match (start) - [s1:SHARE] - (u1:User) optional match (start) - [l1:LIKE] - (u11:User) "
			+ " optional match (stop) - [h2:HAS_COMMENT] - (c2:Comment) optional match (stop) - [s2:SHARE] - (u2:User) optional match (stop) - [l2:LIKE] - (u22:User) "
			+ " return id, status, name, avatar, numPlaces, start.day, start.Latitude, start.Longitude, count (distinct c1), count (distinct s1), count (distinct l1), stop.day, stop.Latitude, stop.Longitude, count (distinct c2), count (distinct s2), count (distinct l2) order by start.day DESC";
	database.runCypherQuery(query, null, callback);
}