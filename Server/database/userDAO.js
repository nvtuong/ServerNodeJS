var database = require('./database.js');


// return User model
module.exports.getUserInfor = function(userID, callback) {
	var query = "match (user:User{id : '" + userID + "'}) return user";
	database.runCypherQuery(query, null, callback);
}

module.exports.getAllFriends = function(userID, callback) {
	var query = "match (me:User{id : '" + userID + "'}) - [FRIEND] -> (u:User) - [r:FRIEND] -> (ff:User) "
                + "optional match (me)- [m:FRIEND]->(ff) return u.id, u.name, u.avatar, "
                + "count(distinct r) as numFriend, count (distinct m) as mutualFriend order by numFriend desc";
    database.runCypherQuery(query, null, callback);
}

module.exports.getSuggestFriends = function(userID, callback) {
	var query = "match (me:User{id : '" + userID + "'}) - [:FRIEND] -> (f:User) - [:FRIEND] -> (u:User) - [r:FRIEND] -> (uu:User) "
                + "where not (me) - [:FRIEND] -> (u) and (me) <> (u) "
                + "return u.id, u.name, u.avatar, count (distinct r) as numFriend, count (distinct f) as mutualFriend order by mutualFriend desc";
    database.runCypherQuery(query, null, callback);
}	

module.exports.getProfileOfUser = function(userID, callback) {
	var query = "match (a:Account{id : '" + userID + "'})- [aa:USER_ACCOUNT] -> (u:User) - [pp:PRO_FILE]-> (p:Profile) "
			+ " Optional match (u) - [f:FRIEND] - (u1:User) Optional match (u) - [post:POST] -> (p1:Post) "
			+ " Optional match (u) <- [fol:FOLLOW] - (u2:User)  return u.avatar, u.name, p.gender, p.birthday, " 
			+ " p.address, a.email, count (distinct f) as numFriend, count (distinct post) as numPost, count (distinct fol) as numFollow";
    database.runCypherQuery(query, null, callback);
}


// Set profile picture of an User who has id is userId
// return true or false
module.exports.setProfilePicture = function(userID, picture) {

}
