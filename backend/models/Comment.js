const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the comment schema
const commentSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true
    },
    content: {
      type: String,
      required: true
    },
    likes: {
      type: [likeSchema], // Array of likes (using the likeSchema)
      default: []
    },
    // replies: {
    //   type: Map,
    //   of: commentSchema,
    //   default: {}
    // }
    parent_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      default: null
    }
  },
  { timestamps: true } // Enable timestamps for comment documents
);

const Comment = mongoose.model('Comment', commentSchema);
  
module.exports = Comment;