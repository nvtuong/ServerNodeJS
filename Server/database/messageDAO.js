var database = require('./database.js');

module.exports.getAllMessages = function(userID, callback) {
	var query = "match (u:User{id: '"+ userID +"'}) - [:MESSAGE] -> (p:Message) <-[:MESSAGE]- (u2:User) where (u) <> (u2) return u2.id, u2.name, u2.avatar, p.date, p.message ORDER BY p.date DESC";
	database.runCypherQuery(query, null, callback);
}

module.exports.getMessageOfUser = function(userID, targetUserID, skip, callback) {
	var limit = 20 * skip + 20;
	var s = skip * 20;
	var query = "match (u1:User{id: '" + userID + "'}) - [r1:MESSAGE] - > (oldM:Message) < - [r2:MESSAGE] - (u2:User{id: '" + targetUserID + "'}) with oldM where oldM is not null match n = (oldM)-[:NEXT*.." + limit + "]-> (m) unwind nodes(n) as x return distinct x.senderID, x.senderName, x.senderAvatar, x.date, x.message skip " + s;
	database.runCypherQuery(query, null, callback);
}

module.exports.sendMessageToUser = function(senderID, targetID, message, date, callback) {
	var query = "match (u1:User{id: '"+senderID+"'}), (u2:User{id: '"+targetID+"'}) "
	+ " merge (u1) - [noti:NOTIFICATION {name : u1.name, avatar : u1.avatar, content : 'message'}] -> (u2) set noti.date = '" + date + "' with u1, u2"
	+ " optional match (u1) - [r1:MESSAGE] - > (oldM:Message) < - [r2:MESSAGE]- (u2) create (u1) - [r3:MESSAGE]-> (newM:Message{senderID: '"+senderID+"', senderAvatar: u1.avatar, senderName: u1.name, date: '"+date+"', message: '"+message+"'}) <- [r4:MESSAGE] - (u2) delete r1, r2 with oldM, newM where oldM is not null create (newM)- [:NEXT] -> (oldM)";
	database.runCypherQuery(query, null, callback);
}

module.exports.loadOneMessageOfUser = function(userID, targetID, callback) {
	var query = "match (u1:User{id: '" + userID + "'}) - [r1:MESSAGE] - > (oldM:Message) < - [r2:MESSAGE] - (u2:User{id: '" + targetID + "'}) return oldM.senderID, oldM.senderName, oldM.senderAvatar, oldM.date, oldM.message";
	database.runCypherQuery(query, null, callback);
}