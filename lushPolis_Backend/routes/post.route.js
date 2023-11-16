const controller = require('../controllers/post.controller');
// const controller = require('../controllers/post.controller');

module.exports = (app) => {
    app.post('/createPost'
    ,function(req, res){
        console.log('createPost');
        controller.createPost(req, res);
        console.log('createPost done');
    });
    
    app.post('/updatePost', function(req, res){
        console.log('updatePost');
        controller.updatePost(req, res);
        console.log('updatePost done');
    });

    app.post('/addComment', function(req, res){
        console.log('addComment');
        controller.addComment(req, res);
        console.log('addComment done');
    });

    app.post('/deletePost',function(req, res){
        console.log('deletePost');
        controller.deletePost(req, res);
        console.log('deletePost done');
    });

    app.post('/getTrendingTagPosts/:tag',function(req, res){
        console.log('getTagPosts');
        controller.getTrendingTagPosts(req, res);
        console.log('getTagPosts done');
    });
    
    app.post('/getTagPosts/:tag',function(req, res){
        console.log('getTagPosts');
        controller.getTagPosts(req, res);
        console.log('getTagPosts done');
    });

    app.get('/getSinglePost/:id',function(req, res){
        console.log('getSinglePost');
        controller.getSinglePost(req, res);
        console.log('getSinglePost done');
    });

    
    app.get('/getallPosts',function(req, res){
        console.log('getallPosts');
        controller.getallPosts(req, res);
        console.log('getallPosts done');
    });

    app.post('/searchPosts',function(req, res){
        console.log('searchPosts');
        controller.searchPosts(req, res);
        console.log('searchPosts done');
    });

    app.get('/getPostLikes/:id',function(req,res){
        console.log('getPostLikes');
        controller.getPostLikes(req,res);
        console.log('getPostLikes done');
    });

    app.get('/getPostComments/:id', function(req,res){
        console.log('getPostComments');
        controller.getPostComments(req,res);
        console.log('getPostComments done');
    });

    app.post('/getBookmarks',function(req, res){
        console.log('getBookmarks');
        controller.getBookmarks(req, res);
        console.log('getBookmarks done');
    });
        

    app.post('/bookmarkPost',function(req,res){
        console.log('bookmarkPost');
        controller.bookmarkPost(req,res);
        console.log('bookmarkPost done');
    }
    );

    app.post('/unbookmarkPost',function(req,res){
        console.log('unbookmarkPost');
        controller.unbookmarkPost(req,res);
        console.log('unbookmarkPost done');
    }
    );
    

    app.post('/likePost',function(req,res){
        console.log('likePost');
        controller.likePost(req,res);
        console.log('likePost done');
    });

    app.post('/unlikePost',function(req,res){
        console.log('unlikePost');
        controller.unlikePost(req,res);
        console.log('unlikePost done');
    });

};