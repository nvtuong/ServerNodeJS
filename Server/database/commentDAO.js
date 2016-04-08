var database = require('./database.js');


// return all comments of a post
// parameter: postID
module.exports.getAllCommentsOfPost = function(postID, callback) {
	var query = "match (p:Post{id: '" + postID + "'}) - [HAS_COMMENT] -> (c:Comment), (u:User{id : c.userID}) "
                        + "return c.id, c.content, c.day, u.id, u.name, u.avatar";
    database.runCypherQuery(query, null, callback);
}

