var request = require("request");
var neo4j = require("node-neo4j");
var db = new neo4j('http://neo4j:hvngoc@localhost:7474');
//var db = new neo4j('http://Neo4jDB:oNSsg7mPm5ziWATNSwJU@neo4jdb.sb02.stations.graphenedb.com:24789');

module.exports.runCypherQuery = function(query, params, callback) {
	db.cypherQuery(query, params, function (err, res) {
			callback(err, res);
		}
	)
}


