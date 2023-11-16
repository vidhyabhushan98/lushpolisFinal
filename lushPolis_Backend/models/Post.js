const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    userId : String,
    title: String,
    content: String,
    summary: String,
    createdAt : Date, 
    author: String,
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: "User" } ],
    editedAt : Date,
    titleImage: [{public_id:{type:String}, url:{type:String}}],
    isPrivate :{
        type: Boolean,
    },
    commentsId: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment" } ],
    isEdited : {
        type: Boolean,
        default: false,
    },
    tags: [{type:String}],
});
const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
