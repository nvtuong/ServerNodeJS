var database = require('./database.js');

// return a list of Post model contains posts of all friends
// limit 20 posts per list
module.exports.getAllPostOfFriends = function(userID, page, callback) {
	var query = "match (u:User{id : '" + userID + "'})-[:FRIEND]-> (uu : User) - [r : POST|:SHARE]-> (p:Post) " 
			+ "Optional match (p) <- [s:SHARE] - (u1:User) " 
			+ "Optional match (p) <- [l:LIKE] - (u2:User) "
			+ "Optional match (p) - [h: HAS_COMMENT] - > (c1:Comment) "
			+ "Optional match (u) -[iss:LIKE]-> (p) "
			+ "return p.id , p.content, p.listImage, p.Latitude, p.Longitude, p.day, p.feeling,uu.name, uu.avatar, r.name, "
			+ "count (distinct s) as numShared, count (distinct l) as numLiked, count (distinct h) as numComment, count (distinct iss) as isYouLike, uu.id "
			+ " ORDER BY p.day DESC skip " + page + " limit 10";
    database.runCypherQuery(query, null, callback);
}

// return a list of Post model contains posts which has been shared or post by a user
// limit 20 post per one request
module.exports.getAllPostAndSharedOfUser = function(userID, skip, callback) {
	var query = "match (u:User{id:'" + userID + "'}) - [r :POST|:SHARE]-> (p:Post) "
			+ " Optional match (p) <- [s:SHARE] - (u1:User) "
			+ " Optional match (p) <- [l:LIKE] - (u2:User) "
			+ " Optional match (p) - [h: HAS_COMMENT] - > (c1:Comment) "
			+ " Optional match (u) -[iss:LIKE]-> (p) "
			+ " return p.id , p.content, p.listImage, p.Latitude, p.Longitude, p.day, p.feeling, u.name, u.avatar, r.name, "
			+ " count (distinct s) as numShared, count (distinct l) as numLiked, count (distinct h) as numComment, count (distinct iss) as isYouLike, u.id "
			+ " ORDER BY p.day DESC skip " + skip + " limit 10";
   	database.runCypherQuery(query, null, callback);
}

module.exports.likeThisPost = function(userID, postID, day, callback) {
	var query = "match (u:User{id : '" + userID + "'}), (p:Post{id : '" + postID + "'}) <-[:POST] - (u2:User) MERGE (u) - [:LIKE] - > (p) "
			+ " merge (p) - [noti:NOTIFICATION {name : u.name, avatar : u.avatar, content : 'like'}] -> (u2) SET noti.date = '" + day + "' "
			+ " return u2.regID, u2.id, p.id";
   	database.runCypherQuery(query, null, callback);
}

module.exports.unLikeThisPost = function(userID, postID, callback) {
	var query = "match (u:User{id : '" + userID + "'}) - [r:LIKE] -> (p:Post{id : '" + postID + "'}) DELETE r";
   	database.runCypherQuery(query, null, callback);
}

module.exports.shareThisPost = function(userID, postID, day, callback) {
	var query = "match (u:User{id : '" + userID + "'}), (p:Post{id : '" + postID + "'}) <-[:POST] - (u2:User) MERGE (u) - [:SHARE{name : 'shared'}] - > (p) "
				+ " merge (p) - [noti:NOTIFICATION {name : u.name, avatar : u.avatar, content : 'share'}] -> (u2) SET noti.date = '" + day + "' "
				+ " return u2.regID, u2.id, p.id";
   	database.runCypherQuery(query, null, callback);
}

module.exports.createPost = function(postID, userID, content, date, Latitude, Longitude, feeling, listImages, callback) {
	var Latitude0 = Math.round(Latitude);
	var Longitude0 = Math.round(Longitude);
	var Latitude2 = Math.round(Latitude * 100) / 100;
	var Longitude2 = Math.round(Longitude * 100) / 100;

	var query = "match (u:User{id : '" + userID + "'}) MERGE (u) - [r:POST{name : 'posted'}] -> " 
		+ "(p:Post{id :'" + postID + "', content : '" + content + "', listImage: '"+ listImages + "', "
		+" feeling : '" + feeling + "', Latitude : " +  Latitude + ", Longitude : " + Longitude + ", day :'" + date +"'})"
		+ " MERGE (q0:Quad0{Latitude : " + Latitude0 + ", Longitude : " + Longitude0 + "}) "
		+ " MERGE (q0) - [:QUAD0] -> (q2:Quad2{Latitude : " + Latitude2 + ", Longitude : " + Longitude2 + "}) "
		+ " MERGE (q2)-[:QUAD2] -> (p)";	
   	database.runCypherQuery(query, null, callback);
   	console.log(query);
}

module.exports.getRegIDofFriend = function(userID, callback) {
	var query = "match (me:User{id : '" + userID + "'}) - [r:FRIEND] - > (f:User) return collect (f.regID)";
	database.runCypherQuery(query, null, callback);
}

module.exports.SearchPost = function(userID, params, callback) {
	var query = "match (u:User{id : '" + userID + "'})-[:FRIEND]-> (uu : User) - [r : POST|:SHARE]-> (p:Post) "
			+ " where uu.name =~ '.*" + params + ".*' or p.content =~ '.*" + params + ".*' "
			+ " Optional match (p) <- [s:SHARE] - (u1:User) " 
			+ " Optional match (p) <- [l:LIKE] - (u2:User) "
			+ " Optional match (p) - [h: HAS_COMMENT] - > (c1:Comment) "
			+ " Optional match (u) -[iss:LIKE]-> (p) "
			+ " return distinct p.id , p.content, p.listImage, p.Latitude, p.Longitude, p.day, p.feeling,uu.name, uu.avatar, r.name, "
			+ " count (distinct s) as numShared, count (distinct l) as numLiked, count (distinct h) as numComment, count (distinct iss) as isYouLike, uu.id "
			+ " ORDER BY p.day LIMIT 10";
    database.runCypherQuery(query, null, callback);
}

module.exports.SearchPostByDistance = function(userID, Latitude, Longitude, LatitudeUp,
					LatitudeDown, LongitudeRight, LongitudeLeft, callback) {
	var Latitude0 = Math.round(Latitude);
	var Longitude0 = Math.round(Longitude);
	var Latitude2 = Math.round(Latitude * 100) / 100;
	var Longitude2 = Math.round(Longitude * 100) / 100;

	var LatitudeDeltaMin = Latitude2 - 0.2;
	var LatitudeDeltaMax = Latitude2 + 0.2;
	var LongitudeDeltaMin = Longitude2 - 0.2;
	var LongitudeDeltaMax = Longitude2 + 0.2;	

	var query = "match (u:User{id : '" + userID + "'})-[:FRIEND]-> (uu : User) - [r : POST|:SHARE]-> (p:Post) "
			+ " <- [:QUAD2] - (q2:Quad2) <- [:QUAD0] - (q0:Quad0{Latitude : " + Latitude0 + ", Longitude : " + Longitude0 + "}) "	
			+ " where q2.Latitude > " + LatitudeDeltaMin + " AND q2.Latitude < " + LatitudeDeltaMax
			+ " AND q2.Longitude > " + LongitudeDeltaMin + " AND q2.Longitude < " + LongitudeDeltaMax
			+ " AND p.Latitude > " + LatitudeDown + " AND p.Latitude < " + LatitudeUp + " AND p.Longitude > " + LongitudeLeft + " AND p.Longitude < " + LongitudeRight
			+ " Optional match (p) <- [s:SHARE] - (u1:User) " 
			+ " Optional match (p) <- [l:LIKE] - (u2:User) "
			+ " Optional match (p) - [h: HAS_COMMENT] - > (c1:Comment) "
			+ " Optional match (u) -[iss:LIKE]-> (p) "
			+ " return p.id , p.content, p.listImage, p.Latitude, p.Longitude, p.day, p.feeling,uu.name, uu.avatar, r.name, "
			+ " count (distinct s) as numShared, count (distinct l) as numLiked, count (distinct h) as numComment, count (distinct iss) as isYouLike, uu.id ";
    database.runCypherQuery(query, null, callback);
}

module.exports.getPostDetail = function(userID, dataID, callback) {
	var query = "match (p:Post{id : '" + dataID + "'}) <- [r:POST] - (u:User) "
			+ " Optional match (p) <- [s:SHARE] - (u1:User) "
			+ " Optional match (p) <- [l:LIKE] - (u2:User) "
			+ " Optional match (p) - [h: HAS_COMMENT] - > (c1:Comment) "
			+ " Optional match (me:User{id : '" + userID + "'}) -[iss:LIKE]-> (p) "
			+ " return p.id , p.content, p.listImage, p.Latitude, p.Longitude, p.day, p.feeling, u.name, u.avatar, r.name, "
			+ " count (distinct s) as numShared, count (distinct l) as numLiked, count (distinct h) as numComment, count (distinct iss) as isYouLike, u.id";
   	database.runCypherQuery(query, null, callback);
}

module.exports.getAllPostOfTour = function(tourID, callback) {
	var query = "match (u:User) - [:TOUR] - > (t:Tour{id : '" + tourID + "'}) - [:HAS_POST] -> (p:Post)"
			+ " Optional match (p) <- [s:SHARE] - (u1:User) "
			+ " Optional match (p) <- [l:LIKE] - (u2:User) "
			+ " Optional match (p) - [h: HAS_COMMENT] - > (c1:Comment) "
			+ " Optional match (u) -[iss:LIKE]-> (p) "
			+ " return p.id , p.content, p.listImage, p.Latitude, p.Longitude, p.day, p.feeling, u.name, u.avatar, 'tour', "
			+ " count (distinct s) as numShared, count (distinct l) as numLiked, count (distinct h) as numComment, count (distinct iss) as isYouLike, u.id "
			+ " ORDER BY p.day DESC limit 20";
   	database.runCypherQuery(query, null, callback);
}

module.exports.likeTourPost = function(userID, postID, day, callback) {
	var query = "match (u:User{id : '" + userID + "'}), (p:Post{id : '" + postID + "'}) <- [:HAS_POST] - (t:Tour) <-[:TOUR] - (u2:User) MERGE (u) - [:LIKE] - > (p) "
			+ " merge (p) - [noti:NOTIFICATION {name : u.name, avatar : u.avatar, content : 'like_tour'}] -> (u2) SET noti.date = '" + day + "' "
			+ " return u2.regID, u2.id, p.id";
   	database.runCypherQuery(query, null, callback);
}

module.exports.shareTourPost = function(userID, postID, day, callback) {
	var query = "match (u:User{id : '" + userID + "'}), (p:Post{id : '" + postID + "'}) <- [:HAS_POST] - (t:Tour) <-[:TOUR] - (u2:User) MERGE (u) - [:SHARE{name : 'shared'}] - > (p) "
				+ " merge (p) - [noti:NOTIFICATION {name : u.name, avatar : u.avatar, content : 'share_tour'}] -> (u2) SET noti.date = '" + day + "' "
				+ " return u2.regID, u2.id, p.id";
   	database.runCypherQuery(query, null, callback);
}

module.exports.getPostTourDetail = function(userID, dataID, callback) {
	var query = "match (p:Post{id : '" + dataID + "'}) <- [:HAS_POST] - (t:Tour) <-[:TOUR] - (u:User) "
			+ " Optional match (p) <- [s:SHARE] - (u1:User) "
			+ " Optional match (p) <- [l:LIKE] - (u2:User) "
			+ " Optional match (p) - [h: HAS_COMMENT] - > (c1:Comment) "
			+ " Optional match (me:User{id : '" + userID + "'}) -[iss:LIKE]-> (p) "
			+ " return p.id , p.content, p.listImage, p.Latitude, p.Longitude, p.day, p.feeling, u.name, u.avatar, 'tour', "
			+ " count (distinct s) as numShared, count (distinct l) as numLiked, count (distinct h) as numComment, count (distinct iss) as isYouLike, u.id ";
   	database.runCypherQuery(query, null, callback);
}

module.exports.createNewPostOnTour = function(postID, tourID, content, date, Latitude, Longitude, feeling, listImages, callback) {
	var query = "match (u:User) - [:TOUR] -> (t:Tour{id : '" + tourID + "'}) SET t.stopID = '" + postID + "' "
		+ " CREATE (t) - [:HAS_POST] -> (p:Post{id :'" + postID + "', content : '" + content + "', listImage: '"+ listImages + "', "
		+ " feeling : '" + feeling + "', Latitude : " +  Latitude + ", Longitude : " + Longitude + ", day :'" + date +"'})"
		+ " return p.id , p.content, p.listImage, p.Latitude, p.Longitude, p.day, p.feeling, u.name, u.avatar, 'tour', "
		+ " 0 as numShared, 0 as numLiked, 0 as numComment, 0 as isYouLike, u.id";		
   	database.runCypherQuery(query, null, callback);
}

module.exports.editPost = function(postID, userID, content, date, Latitude, Longitude, feeling, listImages, callback) {
	var Latitude0 = Math.round(Latitude);
	var Longitude0 = Math.round(Longitude);
	var Latitude2 = Math.round(Latitude * 100) / 100;
	var Longitude2 = Math.round(Longitude * 100) / 100;

	var query = "match (u:User{id : '" + userID + "'}) - [r:POST] -> (p:Post{id : '" + postID + "'}) <- [qq:QUAD2] - (q222:Quad2) DELETE qq " 
		+ " SET p.content = '" + content + "', p.listImage = '"+ listImages + "',"
		+ " p.feeling = '" + feeling + "', p.Latitude = " +  Latitude + ", p.Longitude = " + Longitude + ", p.day = '" + date +"' "
		+ " MERGE (q0:Quad0{Latitude : " + Latitude0 + ", Longitude : " + Longitude0 + "}) "
		+ " MERGE (q0) - [:QUAD0] -> (q2:Quad2{Latitude : " + Latitude2 + ", Longitude : " + Longitude2 + "}) "
		+ " MERGE (q2) - [:QUAD2] -> (p)"
		+ " return p.id , p.content, p.listImage, p.Latitude, p.Longitude, p.day, p.feeling, u.name, u.avatar, r.name, "
		+ " 0 as numShared, 0 as numLiked, 0 as numComment, 0 as isYouLike, u.id";		
   	database.runCypherQuery(query, null, callback);
}

module.exports.editPostTour = function(postID, userID, content, date, Latitude, Longitude, feeling, listImages, callback) {
	var query = "match (u:User{id : '" + userID + "'}) - [:TOUR] -> (tou:Tour) - [r:HAS_POST] -> (p:Post{id : '" + postID + "'}) " 
		+ " SET p.content = '" + content + "', p.listImage = '"+ listImages + "',"
		+ " p.feeling = '" + feeling + "', p.Latitude = " +  Latitude + ", p.Longitude = " + Longitude + ", p.day = '" + date +"' "
		+ " return p.id , p.content, p.listImage, p.Latitude, p.Longitude, p.day, p.feeling, u.name, u.avatar, 'tour', "
		+ " 0 as numShared, 0 as numLiked, 0 as numComment, 0 as isYouLike, u.id";		
   	database.runCypherQuery(query, null, callback);
}