var database = require('./database.js');
var puid = require('../libs/lib.js');

// return all comments of a post
// parameter: postID
module.exports.getAllCommentsOfPost = function(postID, callback) {
	var query = "match (p:Post{id: '" + postID + "'}) - [HAS_COMMENT] -> (c:Comment), (u:User{id : c.userID}) "
                        + "return c.id, c.content, c.day, u.id, u.name, u.avatar";
    database.runCypherQuery(query, null, callback);
}


module.exports.createNewCommentOfPost = function(postID, userID, content, day, callback) {
	var cid = puid.getUniqueID();
	var query = "match (p:Post{id: '" + postID + "'}) , (u:User{id : '" + userID + "'}) create (p) - [h:HAS_COMMENT] -> " 
				+ " (c:Comment{id : '" + postID + cid + "', content : '" + content + "', day : '" + day + "', userID : '" + userID + "'}) "
                + " return c.id, c.content, c.day, u.id, u.name, u.avatar";
    database.runCypherQuery(query, null, callback);
}