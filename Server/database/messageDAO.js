var database = require('./database.js');

module.exports.getAllMessages = function(userID, callback) {
	var query = "match (u:User{id: '"+ userID +"'}) - [:MESSAGE] -> (p:Message) <-[:MESSAGE]- (u2:User) return u2.id, u2.name, u2.avatar, p.date, p.message";

	database.runCypherQuery(query, null, callback);
}

module.exports.getMessageOfUser = function(userID, targetUserID, skip, callback) {
	var query = "match (u1:User{id: '" + userID + "'}) - [r1:MESSAGE] - > (oldM:Message) < - [r2:MESSAGE] - (u2:User{id: '" + targetUserID + "'}) with oldM where oldM is not null match n = (oldM)-[:NEXT*.." + 20 * skip + 20 + "]-> (m) return nodes(n) skip " + 20 * skip;
	database.runCypherQuery(query, null, callback);
}

module.exports.sendMessageToUser = function(senderID, targetID, message, date, callback) {
	var query = "match (u1:User{id: '"+senderID+"'}), (u2:User{id: '"+targetID+"'}) optional match (u1) - [r1:MESSAGE] - > (oldM:Message) < - [r2:MESSAGE]- (u2) create (u1) - [r3:MESSAGE]-> (newM:Message{senderID: '"+senderID+"', senderAvatar: u1.avatar, senderName: u1.name, date: '"+date+"', message: '"+message+"'}) <- [r4:MESSAGE] - (u2) delete r1, r2 with oldM, newM where oldM is not null create (newM)- [:NEXT] -> (oldM)";
	database.runCypherQuery(query, null, callback);
}