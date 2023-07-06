// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const likeSchema = new Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true
//     }
//   },
//   { timestamps: true }
// );

// const Like = mongoose.model('Like', likeSchema);

// module.exports = Like;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema(
  {
    liker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    likeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    likedType: {
      type: String,
      enum: ['Comment', 'Presentation'],
      required: true
    }
  },
  { timestamps: true }
);

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;