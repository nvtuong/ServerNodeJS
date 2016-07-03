var database = require('./database.js');


module.exports.getUserRegId = function(userID, callback) {
	var query = "match (user:User{id: '" + userID + "'}) return user.regID";
	database.runCypherQuery(query, null, callback);
}

module.exports.getAllFriends = function(userID, callback) {
	var query = "match (me:User{id : '" + userID + "'}) - [:FRIEND] -> (u:User) - [r:FRIEND] -> (ff:User) "
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
	var query = "match (a:Account)- [aa:USER_ACCOUNT] -> (u:User{id : '" + userID + "'}) - [pp:PRO_FILE]-> (p:Profile) "
			+ " Optional match (u) - [f:FRIEND] - (u1:User) Optional match (u) - [post:POST] -> (p1:Post) "
			+ " Optional match (u) <- [fol:FOLLOW] - (u2:User)  return u.avatar, u.name, p.gender, p.birthday, " 
			+ " p.address, a.email, count (distinct f) as numFriend, count (distinct post) as numPost, count (distinct fol) as numFollow";
    database.runCypherQuery(query, null, callback);
}

module.exports.searchFriendByEmail = function(email, userID, callback) {
	var query = "match (a:Account{email : '" + email + "'}) - [:USER_ACCOUNT] -> (u:User), (uu:User{id : '" + userID + "'}) "
			+ " where (u) <> (uu) "
			+ " Optional match (u) - [f:FRIEND] -> (u1:User) Optional match (u1) - [ff:FRIEND] -> (uu) "
			+ " optional match (u) - [friend:FRIEND] -> (uu)"
			+ " return u.id, u.avatar, u.name, count (distinct f) as numFriend, count (distinct ff) as mutualFriend, count (friend) as isFriend";
	database.runCypherQuery(query, null, callback);
}

module.exports.getRequestFriends = function(userID, callback) {
	var query = "match (me:User{id : '" + userID + "'}) <- [:FRIEND_REQUEST] - (u:User) "
			+ " Optional match (u) - [f:FRIEND]-> (u1:User) Optional match (u) - [:FRIEND] -> (u2:User) -[:FRIEND] -> (me) "
			+ " return u.id, u.name, u.avatar, count (distinct f) as numFriend, count (distinct u2) as mutualFriend";
	database.runCypherQuery(query, null, callback);
}

// Set profile picture of an User who has id is userId
// return true or false
module.exports.updateUserProfile = function(userID, username, address, birthday, gender, imageUrl, callback) {
	var query;
	if(imageUrl) {
		query = "match (u: User{id: '"+ userID +"'}) -[:PRO_FILE]-> (p: Profile) "
				+ "set u.name='" + username + "', p.address='" + address + "', p.birthday= '" + birthday + "',"
				+ " p.gender='" + gender + "', u.avatar='" + imageUrl + "' "
				+ " return u.name, u.avatar, p.address, p.birthday, p.gender";
	}
	else {
		query = "match (u: User{id: '"+ userID +"'}) -[:PRO_FILE]-> (p: Profile) "
				+ "set u.name='" + username + "', p.address='" + address + "', p.birthday= '" + birthday + "',"
				+ " p.gender='" + gender + "'"
				+ " return u.name, u.avatar, p.address, p.birthday, p.gender";
	}
	database.runCypherQuery(query, null, callback);
}

module.exports.deleteAddFriendRequest = function(userID, friendID, callback) {
	
	var query = "match (me:User{id : '" + userID + "'}) <- [r:FRIEND_REQUEST] - (friend:User{id : '" + friendID + "'}) delete r";
    database.runCypherQuery(query, null, callback);
}

module.exports.deleteFriend = function(userID, friendID, callback) {
	var query = "match (me:User{id : '" + userID + "'}) - [r:FRIEND] - (friend:User{id : '" + friendID + "'}) delete r";
    database.runCypherQuery(query, null, callback);
}

module.exports.addFriend = function(userID, friendID, day, callback) {
	var query = "match (me:User{id : '" + userID + "'}), (friend:User{id : '" + friendID + "'}) MERGE (me) - [r:FRIEND_REQUEST] -> (friend) "
				+ " merge (me) - [noti:NOTIFICATION {name : me.name, avatar : me.avatar, content : 'add'}] -> (friend) "
				+ "SET noti.date = '" + day + "' return friend.regID, friend.id";
    database.runCypherQuery(query, null, callback);
}

module.exports.confirmFriendRequest = function(userID, friendID, day, callback) {
	var query = "match (me:User{id : '" + userID + "'}) - [r:FRIEND_REQUEST] - (friend:User{id : '" + friendID + "'}) delete r "
				+ " merge (me) - [ff:FRIEND] -> (friend) merge (me) <- [ff2:FRIEND] - (friend) "
				+ " merge (me) - [noti:NOTIFICATION {name : me.name, avatar : me.avatar, content : 'confirm'}] -> (friend)  "
				+ " SET noti.date =  '" + day + "' return friend.regID, friend.id";
    database.runCypherQuery(query, null, callback);
}

module.exports.updateRegistrationID = function(userID, regID, callback) {
	var query = "match (me:User{id: '" + userID + "'}) set me.regID = '" + regID + "'";
	database.runCypherQuery(query, null, callback);
}

module.exports.updateDefaultLocation = function(userID, defaultLatitude, defaultLongitude, callback) {
	var query = "match (u:User{id: '" + userID + "'}) set u.defaultLatitude = " + defaultLatitude + ", u.defaultLongitude = " + defaultLongitude;
	database.runCypherQuery(query, null, callback);
}
