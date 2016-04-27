var express = require('express');
var app = express();
var accountDAO = require('./database/accountDAO.js');
var userDAO = require('./database/userDAO.js');
var postDAO = require('./database/postDAO.js');
var commentDAO = require('./database/commentDAO.js');
var puid = require('./libs/lib.js');
var callbackHelpers = require('./libs/callbackHelpers.js');
var fs = require('fs');
var writingHelper = require('./libs/writingHelper.js');


/*-----------------------------INIT--------------------------------*/
app.set('port', 9000);
var bodyParser = require('body-parser')
app.use(bodyParser.json({limit: '50mb'}));       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use('/images', express.static('public'));
app.use('/images', express.static('public/uploads'));



/*-----------------------------END---------------------------------*/


/*------------------------------API--------------------------------*/
app.post('/api/register', function(req, res){
	accountDAO.registerAccount(req.body.name, req.body.email, req.body.password, function(err, result){
		callbackHelpers.registerCallback(res, err, result);
	})
})



app.post('/api/login', function(req, res){
	console.log("login");
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


app.post('/api/updateProfile', function(req, res) {
	console.log("updateProfile");
	var fileName;
	if(req.body.binaryImage) {
		fileName = req.body.userID + '.jpg';
		var path = __dirname + '/public/uploads/' + fileName;
		writingHelper.writeImage(path, req.body.binaryImage, function(err){
			if(err){
				res.status(404);
				res.send(err);
			}
		})
	}
	userDAO.updateUserProfile(req.body.userID, req.body.username, req.body.address, req.body.birthday, 
								req.body.gender, fileName, function(err, result) {
		callbackHelpers.updateUserProfileCallback(res, err, result);
	});
})

app.post('/api/likeThisPost', function(req, res) {
	postDAO.likeThisPost(req.body.userID, req.body.postID, function(err, result){
		callbackHelpers.likeThisPostCallBack(res, err, result);
	})
})

app.post('/api/unLikeThisPost', function(req, res) {
	postDAO.unLikeThisPost(req.body.userID, req.body.postID, function(err, result){
		callbackHelpers.unLikeThisPostCallBack(res, err, result);
	})
})

app.post('/api/shareThisPost', function(req, res) {
	postDAO.shareThisPost(req.body.userID, req.body.postID, function(err, result){
		callbackHelpers.shareThisPostCallBack(res, err, result);
	})
})

app.post('/api/createNewCommentOfPost', function(req, res) {
	commentDAO.createNewCommentOfPost(req.body.postID, req.body.userID, req.body.content, req.body.day, function(err, result){
		callbackHelpers.createNewCommentOfPostCallBack(res, err, result);
	})
})

app.post('/api/getProfileOfUser', function(req, res) {
	userDAO.getProfileOfUser(req.body.userID, function(err, result){
		callbackHelpers.getProfileOfUserCallBack(res, err, result);
	})
})

app.post('/api/searchFriendByEmail', function(req, res) {
	userDAO.searchFriendByEmail(req.body.email, req.body.userID, function(err, result){
		callbackHelpers.searchFriendByEmailCallBack(res, err, result);
	})
})

app.post('/api/getRequestFriends', function(req, res) {
	userDAO.getRequestFriends(req.body.userID, function(err, result){
		callbackHelpers.getRequestFriendsCallBack(res, err, result);
	})
})

app.post('/api/uploadImage', function(req, res) {
	var fileName;
	if(req.body.binary) {
		fileName = req.body.postID + req.body.indexs + '.jpg';
		var path = __dirname + '/public/uploads/' + fileName;
		writingHelper.writeImage(path, req.body.binary, function(err){
			if(err){
				res.status(404);
				res.send(err);
			}
			console.log("up okkkkkkk")
			res.status(200);
			res.send(fileName);
		})
	}
})

app.post('/api/createPost', function(req, res) {
	console.log("createPost");
	console.log(req.body);
		postDAO.createPost(req.body.postID, req.body.userID, req.body.content, req.body.date, 
		req.body.Latitude, req.body.Longitude, req.body.feeling, req.body.listImages,
		req.body.tag, function(err, result){
		callbackHelpers.createPostCallBack(res, err, result);
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



