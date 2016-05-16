var Puid = require('puid');
var puid = new Puid();
var nodemailer = require('nodemailer');
var smtpTransport = require("nodemailer-smtp-transport");


var options = {
	service: "Gmail",
	auth: {
        user: "vantuong6894@gmail.com",
        pass: "4304205080145"
    }
};

var transporter = nodemailer.createTransport(smtpTransport(options));

module.exports.getUniqueID = function(){
	return puid.generate();
}

module.exports.sendEmail = function(target, title, content) {
	var mailOptions = {
		from: 'vantuong6894@gmail.com',
        to : target,
        subject : title,
        text : content
    };
    console.log(mailOptions);
    transporter.sendMail(mailOptions, function(error, response) {
	    if(error) {
	        console.log(error);
	        //res.end("error");
	    } 
	    else {
	        console.log("Message sent: " + response.message);
	        //res.end("sent");
	    }
	});
}