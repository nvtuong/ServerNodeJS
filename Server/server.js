var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var puid = require('./libs/lib.js');
var writingHelper = require('./libs/writingHelper.js');
var accountService = require('./services/accountService.js');
var userService = require('./services/userService.js');
var postService = require('./services/postService.js');
var commentService = require('./services/commentService.js');
var notificationService = require('./services/notificationService.js');
var messageService = require('./services/messageService.js');


/*-----------------------------INIT--------------------------------*/
app.set('port', 9000);
app.use(bodyParser.json({limit: '50mb'}));       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use('/images', express.static('public'));
app.use('/images', express.static('public/uploads'));

global.appRoot = __dirname;
/*-----------------------------END---------------------------------*/


/*------------------------------API for Account --------------------------------*/

app.post('/api/register', accountService.registerService);
app.post('/api/login', accountService.loginService);
app.get('/api/verifyAccount/:id', accountService.verifyAccountService);
app.post('/api/changePassword', accountService.changePasswordService);

/*-----------------------------END----------------------------------------------*/


/*------------------------------API for User --------------------------------*/
//app.post('/api/getUserInfor', userService.getUserInforService);
app.post('/api/getAllFriends', userService.getAllFriendsService);
app.post('/api/getSuggestFriends', userService.getSuggestFriendsService);
app.post('/api/updateProfile', userService.updateProfileService);
app.post('/api/getProfileOfUser', userService.getProfileOfUserService);
app.post('/api/searchFriendByEmail', userService.searchFriendByEmailService);
app.post('/api/getRequestFriends', userService.getRequestFriendsService);
app.post('/api/deleteAddFriendRequest', userService.deleteAddFriendRequestService);
app.post('/api/deleteFriend', userService.deleteFriendService);
app.post('/api/addFriend', userService.addFriendService);
app.post('/api/confirmFriendRequest', userService.confirmFriendRequestService);
app.post('/api/updateRegistrationID', userService.updateRegistrationIDService);
app.post('/api/updateDefaultLocation', userService.updateDefaultLocationService);

/*----------------------------------END----------------------------------------------*/


/*------------------------------API for Post --------------------------------*/

app.post('/api/getAllPostOfFriends', postService.getAllPostOfFriendsService);
app.post('/api/getAllPostOfUser', postService.getAllPostOfUserService);
app.post('/api/likeThisPost', postService.likeThisPostService);
app.post('/api/unLikeThisPost', postService.unLikeThisPostService);
app.post('/api/shareThisPost', postService.shareThisPostService);
app.post('/api/createPost', postService.createPostService);
app.post('/api/SearchPost', postService.SearchPostService);
app.post('/api/SearchPostByDistance', postService.SearchPostByDistanceService);
app.post('/api/getPostDetail', postService.getPostDetailService);

/*-----------------------------------END----------------------------------------------*/



/*------------------------------API for Comment --------------------------------*/

app.post('/api/getAllCommentsOfPost', commentService.getAllCommentsOfPostService);
app.post('/api/createNewCommentOfPost', commentService.createNewCommentOfPostService);
app.post('/api/getLastCommentOfPost', commentService.getLastCommentOfPostService);

/*-----------------------------------END----------------------------------------------*/



/*------------------------------API for Notification --------------------------------*/
app.post('/api/getUserNotification', notificationService.getUserNotificationService);
app.post('/api/makeNotificationPost', notificationService.makeNotificationPostService);
app.post('/api/deleteNotification', notificationService.deleteNotificationService);

/*-----------------------------------END----------------------------------------------*/


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

app.post('/api/uploadImages', function(req, res) {
	var fileNames = []
	if(req.body.binary) {
		var binary = req.body.binary;
		console.log(binary.length);
		var done = 0;
		var isSent = false;
		for (var i = 0; i < binary.length; i++) {
			var fileName = req.body.postID + req.body.startIndex + i + '.jpg';
			fileNames.push(fileName);
			var path = __dirname + '/public/uploads/' + fileName;
			writingHelper.writeImage(path, binary[i], function(err) {
				if(err && !isSent) {
					isSent = true;
					res.status(404);
					res.send(err);
				}
				else if(!err)
					++done;
				if(done === binary.length) {
					res.status(200);
					res.send(fileNames);
				}
			})
		}
	}
})


app.post('/api/sendMessage', messageService.sendMessageService);

app.post('/api/getAllMessages', messageService.getAllMessages);
app.post('/api/loadMessageOfUser', messageService.getMessageOfUser);
app.post('/api/loadOneMessageOfUser', messageService.loadOneMessageOfUser);
app.post('/api/sendMessageToUser', messageService.sendMessageToUser);



/*------------------------------END-------------------------------*/


app.get('/api/getSampleId', function(req, res){
	res.send(puid.getUniqueID());
})

app.get('/', function(req, res){
	console.log(req.url);
	res.type('text/plain');
	res.send('Hello World');
})

app.get('/testEmail', function(req, res) {
	console.log("test send email");
	puid.sendEmail("nvtuong175@gmail.com", "Verify Account", "Please verify your account!");
})

app.listen(process.env.PORT || app.get('port'), function(){
	console.log("Server is running at " + process.env.PORT);
})



