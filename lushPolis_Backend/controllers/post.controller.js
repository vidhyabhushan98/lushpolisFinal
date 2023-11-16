const Post = require("../models/Post");
const User = require('../models/User');
const Comment = require('../models/Comment');
const cloudinary = require('../config/cloudinary');


exports.createPost = async (req, res) => {
    console.log("Inside Backend createPost");
    const { title, summary, content, tags, author, isPrivate, userId, titleImageUrl } = req.body;

    if (!title || !content) {
        console.log("Please add all the fields");
        return res.status(422).json({ error: "Please add all the fields" });
    }
   
    try {
        let imageUrl = {}; 
        if (titleImageUrl) {
        imageUrl = await cloudinary.uploader.upload(titleImageUrl,{
                folder: "blogTitles",
                // width: 300,
                // crop: "scale"
        }, (error, result) => {
            if (error) {
                console.log("Error in uploading image", error.toString())
                return res.status(400).json({ message: 'Image upload failed.' });
            }
            
        });
        }
        const newComment = new Comment({
            comments: [],
        });
        const savedComment = await newComment.save();
        console.log(imageUrl.public_id);
        console.log(imageUrl.secure_url);
        const post = new Post({
            title,
            summary,
            content,
            tags,
            titleImage: imageUrl ? [{
                public_id: imageUrl.public_id,
                url: imageUrl.secure_url,
            }] : [], 
            author,
            userId,
            isEdited: false,
            isPrivate,
            createdAt: new Date().toISOString(),
            likes: [],
            commentsId: savedComment._id, 
        });

        const savedPost = await post.save();

        await User.findByIdAndUpdate(
            userId,
            { $push: { posts: savedPost._id } },
            { new: true }
        ).exec();

        res.json({ message: "Post saved Successfully!", postId: savedPost._id });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
        console.log(err.toString());
    }
}


exports.updatePost = async(req, res) => {
    const { postId, userId, title, summary, content, tags, isPrivate, titleImageUrl } = req.body;
    console.log(postId, userId);
    try{
        const post = await Post.findById(postId).catch((err) => {
            console.log(err);
        });
        if(!post){
            return res.status(400).json({ error: 'Invalid request' });
        }
        if(post.userId != userId){
            return res.status(400).json({ error: 'Invalid request' });
        }
        let imageUrl = {}; 
        if (titleImageUrl) {
        imageUrl = await cloudinary.uploader.upload(titleImageUrl,{
                folder: "blogTitles"
        }, (error, result) => {
            if (error) {
                console.log("Error in uploading image", error.toString())
                return res.status(400).json({ message: 'Image upload failed.' });
            }
            
        });
        }
        post.title = title;
        post.summary = summary;
        post.content = content;
        post.tags = tags;
        post.isPrivate = isPrivate;
        post.isEdited = true;
        if (titleImageUrl) {
            post.titleImage = [{
                public_id: imageUrl.public_id,
                url: imageUrl.secure_url,
            }];
        }
        await post.save();
        res.status(200).json({ message: 'Successfully updated post' });
    }
    catch(error){
        res.status(500).json({ error: 'Internal server error' });
    }
}


exports.addComment = async(req,res) =>{
    console.log(
        "Inside Backend addComment");
    const {text,userId, userName, postId,commentId, userImage} = req.body;
    console.log(text,userId, userName, postId,commentId);
    try{
        const comment = await Comment.findById(commentId).catch((err) => {
            console.log(err);
        }
        );
        console.log("get req data 2");
        if(!comment){
            console.log("Invalid request");
            return res.status(400).json({ error: 'Invalid request' });
        }
        console.log("get req data 3");
        const newComment = {
            text,
            userId,
            userName,
            userImage,
            createdAt: new Date().toISOString(),
            replies : [],
        };
        console.log("new comment",newComment);
        comment.comments.push(newComment);
        console.log("get req data 5" );
        await comment.save();
        console.log("Comment saved");
        res.json({comment:newComment,  message: 'Successfully added comment' });
    }
    catch(error){
        console.log("error adding comment",error.toString());
        res.status(500).json({ error: 'Internal server error' });
    }
}



exports.deletePost = async(req, res) => {
    const { postId, userId } = req.body;
    console.log(postId, userId);
    try{
        const post = await Post.findById(postId).catch((err) => {
            console.log(err);
        });
        if(!post){  
            return res.status(400).json({ error: 'Invalid request' });
        }
        console.log(post.userId);
        if(post.userId != userId){
            return res.status(400).json({ error: 'Invalid request' });
        }
        const comments = await Comment.findById(post.commentsId).catch((err) => {
            console.log(err);
        });
        if(!comments){
            return res.status(400).json({ error: 'Invalid request' });
        }
        //remove post and comments from mongodb
        await Post.findByIdAndDelete(postId).catch((err) => {
            console.log(err);
        });
        await Comment.findByIdAndDelete(post.commentsId).catch((err) => {
            console.log(err);
        });
        //remove post from user's posts array
        await User.findByIdAndUpdate(
            userId,
            { $pull: { posts: postId } },
            { new: true }
        ).exec();
        //remove post from user's bookmarks array
        await User.updateMany(
            {},
            { $pull: { bookmarks: postId } },
            { new: true }
        ).exec();
        //return success message with status 200
        res.status(200).json({ message: 'Successfully deleted post' });
    }
    catch(error){
        res.status(500).json({ error: 'Internal server error' });
    }
}
const calculateWeightedPopularityScore = (post) => {
    const likesWeight = 0.6;
    const timePostedWeight = 0.4; 
    const timeDifference = Date.now() - post.createdAt;
    const normalizedTimeDifference = timeDifference / 10000000; 
    const weightedPopularityScore =
      (likesWeight * post.likes) + (timePostedWeight * normalizedTimeDifference);
    return weightedPopularityScore;
  };

exports.getTrendingTagPosts = async (req, res) => {
    const tag = req.params.tag;
    try {
      const posts = await Post.find({ tags: tag });
      posts.forEach((post) => {
        post.weightedPopularityScore = calculateWeightedPopularityScore(post);
      });
      posts.sort((a, b) => b.weightedPopularityScore - a.weightedPopularityScore);
      const top5Posts = posts.slice(0, 10);
      res.json({ posts: top5Posts });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };


  
exports.getTagPosts = async(req, res) => {
    const tag = req.params.tag;
    console.log(tag);
    await Post.find({ tags: tag })
        .sort({ createdAt: -1 })
        .then((posts) => {
        res.json({ posts });
    })
        .catch((err) => {
        console.log(err);
    });
}


exports.getSinglePost = async(req, res) => {
    console.log("getSinglePost");
    try{
        const post = await Post.findById(req.params.id).catch((err) => {
            console.log(err);
        });
        const user = await User.findById(post.userId).catch((err) => {
            console.log(err);
        }
        );
        if(!user){
            return res.status(400).json({ error: 'Invalid request' });
        }
        if(!post){
            return res.status(400).json({ error: 'Invalid request' });
        }
        res.json({ post, userDp : user.image });
    }
    catch(error){
        res.status(500).json({ error: 'Internal server error' });
    }
}


exports.getallPosts = async(req, res) => {
    try{
        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .catch((err) => {
            console.log(err);
        });
        console.log("Fetched Posts");
        posts.slice(0, 5);
        res.json({ posts });
    }
    catch(error){
        res.status(500).json({ error: 'Internal server error' });
    }
}


exports.searchPosts = async(req, res) => {
    const { query, options } = req.body;
    const searchOptions = options || 'i';
    console.log(query);
    console.log(searchOptions);
    if (!query) {
        return res.status(400).json({
            error: 'Search query is required.'
        });
    }
    const regexQuery = query.split(' ').join(`.*`);
      await Post.find({
                  $or: [
                      { title: { $regex: regexQuery, $options: searchOptions } },
                      { summary: { $regex: regexQuery, $options: searchOptions } }
                  ]
            
      })
          .sort({ createdAt: -1 })
          .then((posts) => {
          res.json({ posts });
      })
          .catch((err) => {
          console.log(err);
      });
  };
  

  
exports.getPostLikes = async(req, res) => {
    try{
        const post = await Post.findById(req.params.id).catch((err) => {
            console.log(err);
        });
        if(!post){
            return res.status(400).json({ error: 'Invalid request' });
        }
        console.log('posts likes', post.likes.length)
        return res.json({ likes: post.likes });
    }
    catch(error){
        res.status(500).json({ error: 'Internal server error' });
    }
}




exports.getPostComments = async(req, res) => {
    try{
        const post = await Post.findById(req.params.id).catch((err) => {
            console.log(err);
        });
        console.log("Post found")
        if(!post){
            return res.status(400).json({ error: 'Invalid request' });
        }
        console.log(post.commentsId);
        const comments = await Comment.findById(post.commentsId).catch((err) => {
            console.log(err);
        });
        console.log("Comments found")
        if(!comments){
            return res.status(400).json({ error: 'Invalid request' });
        }
        res.json({ comments: comments.comments });
    }
    catch(error){
        res.status(500).json({ error: 'Internal server error' });
    }
}



exports.getBookmarks = async(req, res) => {
    console.log("getting bookmarks")
    const {userId} = req.body;
    try {
        console.log("getting bookmarks 1")
        const reqUser = await User.findById(userId).catch((err) => {
            console.log(err);
        });
        console.log("getting bookmarks 2")
        if(!reqUser){
            return res.status(400).json({ error: 'Invalid request' });
        }
        console.log("getting bookmarks 3")
        const bookmarks = await Post.find({ _id: { $in: reqUser.bookmarks } }).catch((err) => {
            console.log(err);
        });
        console.log("getting bookmarks 4")
        if(!bookmarks){
            return res.status(400).json({ error: 'Invalid request' });
        }
        console.log("getting bookmarks 5")
        res.json({ bookmarks: bookmarks });
    } 
    catch(error){
        res.status(500).json({ error: 'Internal server error' });
    }
}



exports.bookmarkPost = async(req, res) => {
    const { postId, userId } = req.body;
    console.log(postId, userId);
    try{
        const user = await User.findById(userId).catch((err) => {
            console.log(err);
        }
        );
        if(!user){
            return res.status(400).json({ error: 'Invalid request' });
        }
        if(user.bookmarks.includes(postId)){
            return res.json({ message: 'You have already bookmarked this post' });
        }
        user.bookmarks.push(postId);
        await user.save();
        res.json({ user});
    }
    catch(error){
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.unbookmarkPost = async(req, res) => {
    console.log("unbookmarkPost server");
    const { postId, userId } = req.body;
    console.log(postId, userId);
    try{
        console.log("unbookmarkPost server 1");
        const user = await User.findById(userId).catch((err) => {
            console.log(err);
        }
        );
        console.log("unbookmarkPost server 2");
        if(!user){
            return res.status(400).json({ error: 'Invalid request' });
        }
        console.log("unbookmarkPost server 3");
        if(!user.bookmarks.includes(postId)){
            return res.json({ message: 'You have not bookmarked this post' });
        }
        console.log("unbookmarkPost server 3");
        user.bookmarks.pull(postId);
        await user.save();
        res.json(user);
    }
    catch(error){
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.likePost = async(req, res) => {
    const { postId, userId } = req.body;
    console.log(postId, userId);
    try{
        const post = await Post.findById(postId).catch((err) => {
            console.log(err);
        });
        if(!post){
            return res.status(400).json({ error: 'Invalid request' });
        }
        if(post.likes.includes(userId)){
            return res.status(400).json({ message: 'You have already liked this post' });
        }
        post.likes.push(userId);
        await post.save();
        res.json({ message: 'Successfully liked post' });
    }
    catch(error){
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.unlikePost = async(req, res) => {
    const { postId, userId } = req.body;
    console.log(postId, userId);
    try{
        const post = await Post.findById(postId).catch((err) => {
            console.log(err);
        });
        console.log("Searched Post")
        if(!post){
            return res.status(400).json({ error: 'Invalid request' });
        }
        console.log("Post found")
        if(!post.likes.includes(userId)){
            return res.status(400).json({ message: 'You have not liked this post' });
        }
        console.log("User has liked the post")
        post.likes.pull(userId);
        console.log("User removed from likes")
        await post.save();
        res.json({ message: 'Successfully unliked post' });
    }
    catch(error){
        console.log(err.toString());
        res.status(500).json({ error: 'Internal server error' });
    }
}


