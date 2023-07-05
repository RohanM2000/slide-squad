const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the like schema
const likeSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true
    }
  },
  { timestamps: true } // Enable timestamps for like documents
);

const Like = mongoose.model('Like', likeSchema);
  
module.exports = Like;