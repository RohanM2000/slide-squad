const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const tweetSchema = new Schema({
//     author: {
//         type: Schema.Types.ObjectId,
//         ref: 'User'
//     },
//     text: {
//         type: String,
//         required: true
//     }
// }, {
//     timestamps: true
// });

// module.exports = mongoose.model("Tweet", tweetSchema);

const slideSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    image: {
      type: String
    }
    // videoUrl: {
    //     type: String
    // }
  });
  
  const presentationSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    slides: [slideSchema],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    // videoUrl: {
    //   type: String
    // },
    category: {
       type: String,
       required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  const Presentation = mongoose.model('Presentation', presentationSchema);
  
  module.exports = Presentation;
  