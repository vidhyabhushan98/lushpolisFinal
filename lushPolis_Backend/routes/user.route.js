const controller = require('../controllers/user.controller');
const multer= require("multer");
const cloudinary = require("../config/cloudinary");
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage });

module.exports = (app) => {

    app.post('/followUser',function(req, res){
        console.log('followUser');
        controller.followUser(req, res);
        console.log('followUser done');
    });

    app.post('/unfollowUser',function(req, res){
        console.log('unfollowUser');
        controller.unfollowUser(req, res);
        console.log('unfollowUser done');
    });

    app.post('/removeProfilePic',function(req, res){
        console.log('removeProfilePic');
        controller.removeProfilePic(req, res);
        console.log('removeProfilePic done');
    }
    );

    app.post('/addProfilePicture', function (req, res) {
        console.log('updateProfilePic');
        controller.updateProfilePic(req, res);
        console.log('updateProfilePic done');
    });
    
    app.post('/updateBio', function (req, res) {
        console.log('updateBio');
        controller.updateBio(req, res);
        console.log('updateBio done');
    });

    app.get('/getFollowingPosts',function(req, res){
        console.log('getFollowingPosts');
        controller.getFollowingPosts(req, res);
        console.log('getFollowingPosts done');
    });

    app.post('/getBetterFollowingPosts',function(req, res){
        console.log('getBetterFollowingPosts');
        controller.getBetterFollowingPosts(req, res);
        console.log('getBetterFollowingPosts done');
    }
    );


    app.get('/getFollowing/:id',function(req, res){
        console.log('getFollowing');
        controller.getFollowing(req, res);
        console.log('getFollowing done');
    });

    app.get('/targetUserPosts/:id',function(req, res){
        console.log('targetUserPosts');
        controller.targetUserPosts(req, res);
        console.log('targetUserPosts done');
    });

    app.get('/getUser/:id',function(req, res){
        console.log('getUser');
        controller.getUser(req, res);
        console.log('getUser done');
    });

    app.post("/searchUsers", function(req, res){
        console.log('searchUsers');
        controller.searchUsers(req, res);
        console.log('searchUsers done');
    });
    
    app.get("/api/user/search=/:search",function(req, res){
        console.log('searchUsers');
        controller.Usersearch(req, res);
        console.log('searchUsers done');
    
    });
};


