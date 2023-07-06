const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    presentation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Presentation',
      required: true
    },
    content: {
      type: String,
      required: true
    },
    parent_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      default: null
    }
  },
  { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
