var database = require('./database.js');
var puid = require('../libs/lib.js');


// return User model
module.exports.loginWithEmailAndPassword = function(email, password, callback){
	var query = "match (a:Account{email : '" + email + "', password : '" + password +"'}) -[r: USER_ACCOUNT]-> (u:User) "
                + "return u";
    console.log(query);
	database.runCypherQuery(query, null, callback);
}


// parameter: id of account and new password, retrun true if success
module.exports.changePassword = function(id, oldPassword, newPassword, callback) {
	var query = "match (u:User{id : '" + id + "'}) <- [:USER_ACCOUNT] - (a:Account{password : '" + oldPassword + "'}) "
				+ "set a.password = '" + newPassword + "' return u.id";
	database.runCypherQuery(query, null, callback);
}


// register new account with name, email, password
// return User model
module.exports.registerAccount = function(name, email, password, defaultLatitude, defaultLongitude, callback) {
	var id = puid.getUniqueID();
	var query =  "CREATE (a:Account {id : '" + id + "', email : '" + email + "', password : '" + password + "'}) "
        + "- [r : USER_ACCOUNT] -> (u:User{id : '" + id + "', name : '" + name + "', avatar: 'default.png', "
		+ " defaultLatitude : " + defaultLatitude + ", defaultLongitude : " + defaultLongitude + "}) " 
		+ "- [p:PRO_FILE] -> (fff:Profile)  return u";
	database.runCypherQuery(query, null, callback)
}



