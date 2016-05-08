var database = require('./database.js');
var puid = require('../libs/lib.js');


// return true if email exists otherwise return false
function checkExistEmail(email, callback) {
	var query = "match (a:Account{email: '" + email + "'}) return count(a) as num";
	database.runCypherQuery(query, null, callback);
};


// return User model
module.exports.loginWithEmailAndPassword = function(email, password, callback){
	var query = "match (a:Account{email : '" + email + "', password : '" + password +"'}) -[r: USER_ACCOUNT]-> (u:User) "
                + "return u";
    console.log(query);
	database.runCypherQuery(query, null, callback);
}


// parameter: id of account and new password, retrun true if success
module.exports.changePassword = function(id, password, callback) {

}


// register new account with name, email, password
// return User model
module.exports.registerAccount = function(name, email, password, defaultLatitude, defaultLongitude, callback) {
	var emailExist = checkExistEmail(email, function(err, result){
		if(result.data[0] > 0 || err) {
			var error = new Error("Email exists!");
			console.log("Email Exists");
			callback(error, null);
		}
		else {
			var id = puid.getUniqueID();
			var query =  "CREATE (a:Account {id : '" + id + "', email : '" + email + "', password : '" + password + "'}) "
                + "- [r : USER_ACCOUNT] -> (u:User{id : '" + id + "', name : '" + name + "', avatar: 'default.png', "
				+ " defaultLatitude : " + defaultLatitude + ", defaultLongitude : " + defaultLongitude + "}) " 
				+ "- [p:PRO_FILE] -> (fff:Profile)  return u";
    		database.runCypherQuery(query, null, callback)
		}
	})
}



