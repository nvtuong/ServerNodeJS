var database = require('./database.js');


// return a list of Post model contains posts of all friends
// limit 20 posts per list
module.exports.getAllPostOfFriends = function(userID, callback) {
	var query = "match (u:User{id : '" + userID + "'})-[:FRIEND]-> (uu : User) - [r : POST|:SHARE]-> (p:Post) " 
			+ "Optional match (p) <- [s:SHARE] - (u1:User) " 
			+ "Optional match (p) <- [l:LIKE] - (u2:User) "
			+ "Optional match (p) - [h: HAS_COMMENT] - > (c1:Comment) "
			+ "Optional match (u) -[iss:LIKE]-> (p) "
			+ "return p.id , p.content, p.listImage, p.Latitude, p.Longitude, p.day, p.feeling,uu.name, uu.avatar, r.name, "
			+ "count (distinct s) as numShared, count (distinct l) as numLiked, count (distinct h) as numComment, count (distinct iss) as isYouLike";
    database.runCypherQuery(query, null, callback);
}




// return a list of Post model contains posts which has been shared or post by a user
// limit 20 post per one request
module.exports.getAllPostAndSharedOfUser = function(userID, callback) {
	var query = "match (u:User{id:'" + userID + "'}) - [r :POST|:SHARE]-> (p:Post) "
			+ " Optional match (p) <- [s:SHARE] - (u1:User) "
			+ " Optional match (p) <- [l:LIKE] - (u2:User) "
			+ " Optional match (p) - [h: HAS_COMMENT] - > (c1:Comment) "
			+ " Optional match (u) -[iss:LIKE]-> (p) "
			+ " return p.id , p.content, p.listImage, p.Latitude, p.Longitude, p.day, p.feeling, u.name, u.avatar, r.name, "
			+ " count (distinct s) as numShared, count (distinct l) as numLiked, count (distinct h) as numComment, count (distinct iss) as isYouLike";
   	database.runCypherQuery(query, null, callback);
}

module.exports.likeThisPost = function(userID, postID, callback) {
	var query = "match (u:User{id : '" + userID + "'}), (p:Post{id : '" + postID + "'}) create (u) - [:LIKE] - > (p)";
   	database.runCypherQuery(query, null, callback);
}

module.exports.unLikeThisPost = function(userID, postID, callback) {
	var query = "match (u:User{id : '" + userID + "'}) - [r:LIKE] -> (p:Post{id : '" + postID + "'}) DELETE r";
   	database.runCypherQuery(query, null, callback);
}

module.exports.shareThisPost = function(userID, postID, callback) {
	var query = "match (u:User{id : '" + userID + "'}), (p:Post{id : '" + postID + "'}) create (u) - [:SHARE] - > (p)";
   	database.runCypherQuery(query, null, callback);
}






