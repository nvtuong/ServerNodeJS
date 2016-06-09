var database = require('./database.js');

module.exports.getUserNotification = function(userID, callback) {
	var query = "match (me:User{id : '" + userID + "'}) < - [n:NOTIFICATION] - (p) where n.content <> 'message' and n.content <> 'add' return n.name, n.avatar, n.content, n.date, p.id";
    database.runCypherQuery(query, null, callback);
}


module.exports.deleteNotification = function(userID, dataID, callback) {
	var query = "match (me:User{id : '" + userID + "'}) <- [r:NOTIFICATION] - ({id : '" + dataID + "'}) delete r";
    database.runCypherQuery(query, null, callback);
}

module.exports.makeNotificationPost = function(userID, Latitude, Longitude, LatitudeUp,
					LatitudeDown, LongitudeRight, LongitudeLeft, day, callback) {

	var Latitude0 = Math.round(Latitude);
	var Longitude0 = Math.round(Longitude);
	var Latitude2 = Math.round(Latitude * 100) / 100;
	var Longitude2 = Math.round(Longitude * 100) / 100;

	var LatitudeDeltaMin = Latitude2 - 0.2;
	var LatitudeDeltaMax = Latitude2 + 0.2;
	var LongitudeDeltaMin = Longitude2 - 0.2;
	var LongitudeDeltaMax = Longitude2 + 0.2;	

	var query = "match (u:User{id : '" + userID + "'}) - [:FRIEND] -> (uu : User) - [r:POST]-> (p:Post) "
			+ " <- [:QUAD2] - (q2:Quad2) <- [:QUAD0] - (q0:Quad0{Latitude : " + Latitude0 + ", Longitude : " + Longitude0 + "}) "	
			+ " where q2.Latitude > " + LatitudeDeltaMin + " AND q2.Latitude < " + LatitudeDeltaMax
			+ " AND q2.Longitude > " + LongitudeDeltaMin + " AND q2.Longitude < " + LongitudeDeltaMax
			+ " AND p.Latitude > " + LatitudeDown + " AND p.Latitude < " + LatitudeUp + " AND p.Longitude > " + LongitudeLeft + " AND p.Longitude < " + LongitudeRight
			+ " MERGE (p) - [noti:NOTIFICATION{name : uu.name, avatar : uu.avatar, content : 'friend'}] -> (u) set noti.date = '" + day + "' "
			+ " return 1 as hasFound  UNION ALL "
			+ " match (u:User{id : '" + userID + "'}) - [r:POST]-> (p:Post) "
			+ " <- [:QUAD2] - (q2:Quad2) <- [:QUAD0] - (q0:Quad0{Latitude : " + Latitude0 + ", Longitude : " + Longitude0 + "}) "	
			+ " where q2.Latitude > " + LatitudeDeltaMin + " AND q2.Latitude < " + LatitudeDeltaMax
			+ " AND q2.Longitude > " + LongitudeDeltaMin + " AND q2.Longitude < " + LongitudeDeltaMax
			+ " AND p.Latitude > " + LatitudeDown + " AND p.Latitude < " + LatitudeUp + " AND p.Longitude > " + LongitudeLeft + " AND p.Longitude < " + LongitudeRight
			+ " MERGE (p) - [noti:NOTIFICATION{name : u.name, avatar : u.avatar, content : 'mine'}] -> (u) set noti.date = '" + day + "' "
			+ " return 1 as hasFound";
    database.runCypherQuery(query, null, callback);
}