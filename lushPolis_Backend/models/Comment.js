const mongoose = require('mongoose');
const CommentSchema = new mongoose.Schema({
    comments:[
      {
        text: {
          type: String,
          required: true,
        },
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        userImage: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        userName: {
          type: String,
          required: true,
        },
        replies: [
          {
            text: {
              type: String,
              required: true,
            },
            user: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'User',
              required: true,
            },
            createdAt: {
              type: Date,
              default: Date.now,
            },
          },
        ],
      },
    ],
  
});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;