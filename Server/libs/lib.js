var Puid = require('puid');
var puid = new Puid();

module.exports.getUniqueID = function(){
	return puid.generate();
}