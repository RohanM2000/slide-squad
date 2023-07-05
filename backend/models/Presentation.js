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
  
  const presentationSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    likes: {
      type: {
        type: Map,
        of: likeSchema
      }, // Object of likes (using the likeSchema)
      default: {}
    },
    comments: {
      type: {
        type: Map,
        of: commentSchema
      },
      default: {}
    },
    slides: {
      type: Object,
      // of: new Schema({
        // id: {
          // type: Number,
          required: true
        // }
      // }, { _id: false })
    }
  }, { timestamps: true });
  
  const Presentation = mongoose.model('Presentation', presentationSchema);
  
  module.exports = Presentation;
  

  