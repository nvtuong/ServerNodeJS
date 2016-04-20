var fs = require('fs');

module.exports.writeImage = function(path, image, callback) {
	fs.writeFile(path, new Buffer(image, "base64"), function(err){
		if(err)
        	callback(err);
        else 
        	callback(null);
	})
}