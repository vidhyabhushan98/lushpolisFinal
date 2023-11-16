const Post = require("../models/Post");
const User = require('../models/User');
const Comment = require('../models/Comment');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const Favorite = require('../models/Favorite');
const asyncHandler = require("express-async-handler");
const cloudinary = require('../config/cloudinary');

exports.followUser = async(req, res) => {
    try{
        const currentUserId = req.body.userId;
        const targetUserId = req.body.targetId;
        console.log(currentUserId, targetUserId);
        const user = await User.findById(currentUserId).catch((err) => {
            console.log(err);
        });
        if(!user){
            return res.status(400).json({ error: 'Current User Not Found' });
        }
        const targetUser = await User.findById(targetUserId).catch((err) => {
            console.log(err);
        });
        if(!targetUser){
            return res.status(400).json({ error: 'Target User Not Found' });
        }

        if(user.following.includes(targetUserId)){
            return res.status(200).json({ message: 'You are already following this user' });
        }
        User.findByIdAndUpdate(
            currentUserId,
            { $push: { following: targetUserId } },
            { new: true }
        ).exec();
        
        User.findByIdAndUpdate
        (
            targetUserId,
            { $push: { followers: currentUserId } },
            { new: true }
        ).exec();

        res.status(200).json({ message: 'Successfully followed user' });
    }
    catch(err){
        res.status(500).json({ error: 'Internal server error' });
    }
}
  
exports.unfollowUser = async(req, res) => {
    try{
    const currentUserId = req.body.userId;
    const targetUserId = req.body.targetId;

    const user = await User.findById(currentUserId).catch((err) => {
        console.log(err);
    });
    if(!user){
        return res.status(400).json({ error: 'Invalid request' });
    }
    const targetUser = await User.findById(targetUserId).catch((err) => {
        console.log(err);
    });
    if(!targetUser){
        return res.status(400).json({ error: 'Invalid request' });
    }

    if(!user.following.includes(targetUserId)){
        return res.status(200).json({ message: 'You are not following this user' });
    }

    User.findByIdAndUpdate(
        currentUserId,
        { $pull: { following: targetUserId } },
        { new: true }
    ).exec();
    User.findByIdAndUpdate(
        targetUserId,
        { $pull: { followers: currentUserId } },
        { new: true }
    ).exec();

    res.status(200).json({ message: 'Successfully unfollowed user' });
    }
    catch(err){
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.getFollowingPosts = (req, res) => {
    const currentUser = req.user;
    const following = currentUser.following;
    Post.find({ userId: { $in: following } })
        .sort({ createdAt: -1 })
        .then((posts) => {
        res.json({ posts });
    })
        .catch((err) => {
        console.log(err);
    });
}

exports.getFollowing = async(req, res) => {
    try{
        const user = await User.findById(req.params.id).catch((err) => {
            console.log(err);
        });
        if(!user){
            return res.status(400).json({ error: 'Invalid request' });
        }
        const following = user.following;
        const followingDetails = await User.find({ _id: { $in: following } }).catch((err) => {
            console.log(err);
        });
        console.log(followingDetails);
        console.log("Following Details fetched")
        res.json({ following: followingDetails });
    }
    catch(error){
        res.status(500).json({ error: 'Internal server error' });
    }
}


exports.updateBio = async(req, res) => {
    const {userId, bio} = req.body;
    console.log("inside updating bio", userId, bio)
    try{
        const user = await User.findById(userId).catch((err) => {
            console.log(err);
        }
        );
        if(!user){
            return res.status(400).json({ error: 'Invalid request' });
        }
        console.log("user found")
        user.bio = bio;
        await user.save();
        console.log("user saved")
        res.json({user});
    }
    catch(error){
        res.status(500).json({ error: 'Internal server error' });
    }
}



exports.targetUserPosts = async(req, res) => {
    const targetUser = req.params.id;
    await Post.find({ userId: targetUser })
        .sort({ createdAt: -1 })
        .then((posts) => {
        res.json({ posts });
    })
        .catch((err) => {
        console.log(err);
    });
}



exports.searchUsers = async(req, res) => {
    const{query, options} = req.body;
    const searchOptions = options || 'i';
    // console.log(query);
    // console.log(searchOptions);
    if (!query) {
        return res.status(400).json({
            error: 'Search query is required.'
        });
    }
    const regexQuery = query.split(' ').join(`.*`);
    await User.find({
            $or: [
              { name: { $regex: regexQuery, $options: searchOptions } },
              { email: { $regex: regexQuery, $options: searchOptions } }
            ]
      })
      .then((users) => {
        res.json({ users });
        })
        .catch((err) => {
        console.log(err);
      });
}

exports.getUser = async(req, res) => {
    try{
        const user = await User.findById(req.params.id).catch((err) => {
            console.log(err);
        });
        if(!user){
            return res.status(400).json({ error: 'Invalid request' });
        }
        res.json({ user });
    }
    catch(error){
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.removeProfilePic = async(req, res) => {
    console.log("inside removing picture")
    const {userId} = req.body;
    try{
        const user = await User.findById(userId).catch((err) => {
            console.log(err);
        });
        if(!user){
            return res.status(400).json({ error: 'Invalid request' });
        }
        user.image = {};
        await user.save();
        res.json({user});
    }
    catch(err){
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.updateProfilePic = async(req, res) => {
    console.log("inside adding picture")
    const {userId, image} = req.body;
    try{
        const imageUrl = await cloudinary.uploader.upload(image, {
            folder:"profilePictures",
        }, (err, result) => {
            if(err){
                console.log("Error in uploading product image: ", err);
                return res.status(500).json({error: "Something went wrongin image upload"});
            }
        });
        const user = await User.findById(userId).catch((err) => {
            console.log(err);
        }
        );
        if(!user){
            return res.status(400).json({ error: 'Invalid request' });
        }
        user.image = {
            public_id: imageUrl.public_id,
            url: imageUrl.secure_url,
        };
        await user.save();
        res.json({user});
    }
    catch(err){
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.getBetterFollowingPosts = async(req, res) => {
    const {user,page2} = req.body;
    console.log("in getBetterFollowingPosts 1", user);
    const following = user.following;
    console.log("in getBetterFollowingPosts 2");
    const pageSize = 5;
    const page = page2 || 1;
    console.log("in getBetterFollowingPosts 3");
    try {
      const posts = await Post.find({ userId: { $in: following } })
        .sort({ createdAt: -1 })
        .skip((page - 1) * pageSize) 
        .limit(pageSize); 
        console.log("in getBetterFollowingPosts",posts);
      res.json({posts});
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
}






exports.allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
  
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    //console.log(users);
    res.send(users);
  });

  exports.registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;
  
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please Enter all the Feilds");
    }
  
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
  
    const user = await User.create({
      name,
      email,
      password,
      pic,
    });
  
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("User not found");
    }
  });


  exports.authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  });

  exports.Usersearch = async(req, res) => {
    console.log("in user search");
    const {user} = req.query
    // console.log(req.params.search);
    //console.log(req);
    const id = user._id
    console.log("user in search results", user, user._id)
    const keyword = req.params.search
      ? {
          $or: [
            { name: { $regex: req.params.search, $options: "i" } },
            { email: { $regex: req.params.search, $options: "i" } },
          ],
        }
      : {};
        
    const users = await User.find(keyword).find({ _id: { $ne: id } });
    // console.log("search results",users);
    // console.log(users);
    res.json(users);
}


