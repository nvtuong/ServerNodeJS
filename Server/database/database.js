var request = require("request");
var urlConnection = "http://localhost:7474/db/data/transaction/commit";
var neo4j = require("node-neo4j");
var db = new neo4j('http://neo4j:hvngoc@localhost:7474');

module.exports.runCypherQuery = function(query, params, callback) {
	db.cypherQuery(query, params, function (err, res) {
			callback(err, res);
		}
	)
}


