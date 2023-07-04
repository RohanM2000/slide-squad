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
  

  