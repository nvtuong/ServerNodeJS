var express = require('express');
var app = express();
var accountDAO = require('./database/accountDAO.js');
var userDAO = require('./database/userDAO.js');
var postDAO = require('./database/postDAO.js');
var commentDAO = require('./database/commentDAO.js');
var puid = require('./libs/lib.js');
var callbackHelpers = require('./libs/callbackHelpers.js');
var fs = require('fs');


/*-----------------------------INIT--------------------------------*/
app.set('port', 9000);
var bodyParser = require('body-parser')
app.use(bodyParser.json({limit: '50mb'}));       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use('/images', express.static('public'));
app.use('/images', express.static('public/upload'));



/*-----------------------------END---------------------------------*/


/*------------------------------API--------------------------------*/
app.post('/api/register', function(req, res){
	accountDAO.registerAccount(req.body.name, req.body.email, req.body.password, function(err, result){
		callbackHelpers.registerCallback(res, err, result);
	})
})



app.post('/api/login', function(req, res){
	accountDAO.loginWithEmailAndPassword(req.body.email, req.body.password, function(err, result){
		callbackHelpers.loginCallback(res, err, result);
	});
})


app.post('/api/getUserInfor', function(req, res) {
	userDAO.getUserInfor(req.body.userID, function(err, result) {
		callbackHelpers.getUserInforCallback(res, err, result);
	})
})

app.post('/api/getAllFriends', function(req, res) {
	userDAO.getAllFriends(req.body.userID, function(err, result){
		callbackHelpers.getAllFriendsCallback(res, err, result);
	})
})

app.post('/api/getSuggestFriends', function(req, res) {
	userDAO.getSuggestFriends(req.body.userID, function(err, result){
		callbackHelpers.getSuggestFriendsCallback(res, err, result);
	})
})

app.post('/api/getAllPostOfFriends', function(req, res) {
	postDAO.getAllPostOfFriends(req.body.userID, function(err, result) {
		callbackHelpers.getAllPostOfFriendsCallback(res, err, result);
	})
})

app.post('/api/getAllPostOfUser', function(req, res) {
	postDAO.getAllPostAndSharedOfUser(req.body.userID, function(err, result) {
		callbackHelpers.getAllPostOfUserCallback(res, err, result);
	})
})

app.post('/api/getAllCommentsOfPost', function(req, res) {
	commentDAO.getAllCommentsOfPost(req.body.postID, function(err, result){
		callbackHelpers.getAllCommentsOfPostCallback(res, err, result);
	})
})

app.post('/upload', function(req, res) {
    console.log(req.files.image.originalFilename);
    console.log(req.files.image.path);
        fs.readFile(req.files.image.path, function (err, data){
        var dirname = "/public";
        var newPath = dirname + "/uploads/" +   req.files.image.originalFilename;
        fs.writeFile(newPath, data, function (err) {
        if(err){
        	res.status(404);
        	res.json({'response':"Error"});
        }else {
        	res.status(200);
        	res.json({'response':"Saved"});
}
});
});
});


function decodeBase64Image(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');

  return response;
}

app.post('/api/updateProfile', function(req, res) {
	var path = __dirname + '/public/uploads/avatar_' + req.body.userID + '.jpg';
	console.log("updateProfile");
	fs.writeFile(path, new Buffer(req.body.avatar, "base64"), function(err){
		if(err){
        	res.status(404);
        	console.log(err);
        	res.json({'response':"Error"});
        }else {
        	res.status(200);
        	res.json({'response':"Saved"});
        }
	})
})
/*------------------------------END-------------------------------*/





app.get('/api/getSampleId', function(req, res){
	res.send(puid.getUniqueID());
})

app.get('/', function(req, res){
	console.log(req.url);
	res.type('text/plain');
	res.send('Hello World');
})

app.listen(app.get('port'), function(){
	console.log("Server is running!");
})



