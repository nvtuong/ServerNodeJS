var database = require('./database.js');

module.exports.getUserNotification = function(userID, callback) {
	var query = "match (me:User{id : '" + userID + "'}) < - [n:NOTIFICATION] - (p) return n.name, n.avatar, n.content, n.date, p.id";
    database.runCypherQuery(query, null, callback);
}

module.exports.makeNotificationFriendPost = function(userID, Latitude, Longitude, distance, day, callback) {
	var query = "match (u:User{id : '" + userID + "'}) - [:FRIEND] -> (uu : User) - [r:POST]-> (p:Post) "
			+ "where 2000 * 6371 * asin(sqrt(haversin(radians(p.Latitude - " + Latitude + ")) + cos(radians(p.Latitude)) "
			+ "* cos(radians(" + Latitude + ")) * haversin(radians(p.Longitude - " + Longitude + ")))) < " + distance 
			+ " MERGE (p) - [noti:NOTIFICATION{name : uu.name, avatar : uu.avatar, content : 'friend'}] -> (u) set noti.date = '" + day + "' "
			+ " return uu.name ";
    database.runCypherQuery(query, null, callback);
}

module.exports.makeNotificationMyPost = function(userID, Latitude, Longitude, distance, day, callback) {
	var query = "match (u:User{id : '" + userID + "'}) - [r:POST]-> (p:Post) "
			+ "where 2000 * 6371 * asin(sqrt(haversin(radians(p.Latitude - " + Latitude + ")) + cos(radians(p.Latitude)) "
			+ "* cos(radians(" + Latitude + ")) * haversin(radians(p.Longitude - " + Longitude + ")))) < " + distance 
			+ " MERGE (p) - [noti:NOTIFICATION{name : u.name, avatar : u.avatar, content : 'mine'}] -> (u) set noti.date = '" + day + "' "
			+ " return u.name ";
    database.runCypherQuery(query, null, callback);
}

module.exports.deleteNotification = function(userID, dataID, callback) {
	var query = "match (me:User{id : '" + userID + "'}) <- [r:NOTIFICATION] - ({id : '" + dataID + "'}) delete r";
    database.runCypherQuery(query, null, callback);
}