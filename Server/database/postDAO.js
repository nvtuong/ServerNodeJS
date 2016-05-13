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
			+ "count (distinct s) as numShared, count (distinct l) as numLiked, count (distinct h) as numComment, count (distinct iss) as isYouLike, p.tag";
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
			+ " count (distinct s) as numShared, count (distinct l) as numLiked, count (distinct h) as numComment, count (distinct iss) as isYouLike, p.tag";
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
	var query = "match (u:User{id : '" + userID + "'}), (p:Post{id : '" + postID + "'}) create (u) - [:SHARE{name : 'shared'}] - > (p)";
   	database.runCypherQuery(query, null, callback);
}

module.exports.createPost = function(postID, userID, content, date, Latitude, Longitude, feeling, listImages, tag, callback) {
	var query = "match (u:User{id : '" + userID + "'}) create (u) - [r:POST{name : 'posted'}] -> " 
		+ "(p:Post{id :'" + postID + "', content : '" + content + "', listImage: '"+ listImages + "', tag :" + tag + ", "
		+" feeling : '" + feeling + "', Latitude : " +  Latitude + ", Longitude : " + Longitude + ", day :'" + date +"'})"
   		+ " return p.id , p.content, p.listImage, p.Latitude, p.Longitude, p.day, p.feeling, u.name, u.avatar, r.name, "
		+ " 0 as numShared, 0 as numLiked, 0 as numComment, 0 as isYouLike, p.tag";	
   	database.runCypherQuery(query, null, callback);
}

module.exports.SearchPost = function(userID, params, callback) {
	var query = "match (u:User{id : '" + userID + "'})-[:FRIEND]-> (uu : User) - [r : POST|:SHARE]-> (p:Post) "
			+ "where uu.name =~ '.*" + params + ".*' or p.content =~ '.*" + params + ".*' or (any (tag in p.tag where tag =~ '.*" + params + ".*')) "
			+ "Optional match (p) <- [s:SHARE] - (u1:User) " 
			+ "Optional match (p) <- [l:LIKE] - (u2:User) "
			+ "Optional match (p) - [h: HAS_COMMENT] - > (c1:Comment) "
			+ "Optional match (u) -[iss:LIKE]-> (p) "
			+ "return p.id , p.content, p.listImage, p.Latitude, p.Longitude, p.day, p.feeling,uu.name, uu.avatar, r.name, "
			+ "count (distinct s) as numShared, count (distinct l) as numLiked, count (distinct h) as numComment, count (distinct iss) as isYouLike, p.tag LIMIT 10";
    database.runCypherQuery(query, null, callback);
}

module.exports.SearchPostByDistance = function(userID, Latitude, Longitude, distance, callback) {
	var query = "match (u:User{id : '" + userID + "'})-[:FRIEND]-> (uu : User) - [r : POST|:SHARE]-> (p:Post) "
			+ "where 2000 * 6371 * asin(sqrt(haversin(radians(p.Latitude - " + Latitude + ")) + cos(radians(p.Latitude)) "
			+ "* cos(radians(" + Latitude + ")) * haversin(radians(p.Longitude - " + Longitude + ")))) < " + distance + " "
			+ "Optional match (p) <- [s:SHARE] - (u1:User) " 
			+ "Optional match (p) <- [l:LIKE] - (u2:User) "
			+ "Optional match (p) - [h: HAS_COMMENT] - > (c1:Comment) "
			+ "Optional match (u) -[iss:LIKE]-> (p) "
			+ "return p.id , p.content, p.listImage, p.Latitude, p.Longitude, p.day, p.feeling,uu.name, uu.avatar, r.name, "
			+ "count (distinct s) as numShared, count (distinct l) as numLiked, count (distinct h) as numComment, count (distinct iss) as isYouLike, p.tag";
    database.runCypherQuery(query, null, callback);
}

module.exports.getPostDetail = function(userID, dataID, callback) {
	var query = "match (p:Post{id : '" + dataID + "'}) <- [r:POST] - (u:User) "
			+ " Optional match (p) <- [s:SHARE] - (u1:User) "
			+ " Optional match (p) <- [l:LIKE] - (u2:User) "
			+ " Optional match (p) - [h: HAS_COMMENT] - > (c1:Comment) "
			+ " Optional match (me:User{id : '" + userID + "'}) -[iss:LIKE]-> (p) "
			+ " return p.id , p.content, p.listImage, p.Latitude, p.Longitude, p.day, p.feeling, u.name, u.avatar, r.name, "
			+ " count (distinct s) as numShared, count (distinct l) as numLiked, count (distinct h) as numComment, count (distinct iss) as isYouLike, p.tag";
   	database.runCypherQuery(query, null, callback);
}
