const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    likes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Like'
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);