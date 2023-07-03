const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
// const Tweet = mongoose.model('Tweet');
const Presentation = mongoose.model('Presentation');
const { requireUser } = require('../../config/passport');
// const validateTweetInput = require('../../validations/tweet');

/* GET tweets listing. */
// router.get('/', async (req, res) => {
//     try {
//         const tweets = await Tweet.find()
//                                     .populate("author", "_id username")
//                                     .sort({ createdAt: -1 });
//         return res.json(tweets);
//     }
//     catch(err) {
//         return res.json([]);
//     }
// });

/* GET presentations listing. */
router.get('/', async (req, res) => {
    try {
        const presentations = await Presentation.find()
                                    .populate("author", "_id username")
                                    .sort({ createdAt: -1 });
        return res.json(presentations);
    }
    catch(err) {
        return res.json([]);
    }
});

// router.get('/user/:userId', async (req, res, next) => {
//     let user;
//     try {
//         user = await User.findById(req.params.userId);
//     }
//     catch(err) {
//         const error = new Error('User not found');
//         error.statusCode = 404;
//         error.errors = { message: "No user found with that id" };
//         return next(error);
//     }
//     try {
//         const tweets = await Tweet.find({ author: user._id })
//                                     .sort({ createdAt: -1 })
//                                     .populate("author", "_id username");
//         return res.json(tweets);
//     }
//     catch(err) {
//         return res.json([]);
//     }
// });

// Get presentation of a specific user by their id. 
router.get('/user/:userId', async (req, res, next) => {
    let user;
    try {
        user = await User.findById(req.params.userId);
    }
    catch(err) {
        const error = new Error('User not found');
        error.statusCode = 404;
        error.errors = { message: "No user found with that id" };
        return next(error);
    }
    try {
        const presentations = await Presentation.find({ author: user._id })
                                    .sort({ createdAt: -1 })
                                    .populate("author", "_id username");
        return res.json(presentations);
    }
    catch(err) {
        return res.json([]);
    }
});

// router.get('/:id', async (req, res, next) => {
//     try {
//         const tweet = await Tweet.findById(req.params.id)
//                                     .populate("author", "_id username");
//         return res.json(tweet);
//     }
//     catch(err) {
//         const error = new Error('Tweet not found');
//         error.statusCode = 400;
//         error.errors = { message: "No tweet found with that id" };
//         return next(error);
//     }
// });

// Get presentation by its Id. 
router.get('/:id', async (req, res, next) => {
    try {
        const presentation = await Presentation.findById(req.params.id)
                                    .populate("author", "_id username");
        return res.json(presentation);
    }
    catch(err) {
        const error = new Error('Presentation not found');
        error.statusCode = 400;
        error.errors = { message: "No Presentation found with that id" };
        return next(error);
    }
});

// router.post('/', requireUser, validateTweetInput, async (req, res, next) => {
//     try {
//         const newTweet = new Tweet({
//             text: req.body.text,
//             author: req.user._id
//         });

//         let tweet = await newTweet.save();
//         tweet = await tweet.populate('author', '_id username');
//         return res.json(tweet);
//     }
//     catch(err) {
//         next(err);
//     }
// });

router.post('/', requireUser, validatePresentationInput, async (req, res, next) => {
// router.post('/', requireUser, async (req, res, next) => {
    try {

        const { title, category, slides } = req.body;

        const newPresentation = new Presentation({
            title,
            category,
            author: req.user._id,
            slides
        });

        const presentation = await newPresentation.save();
        presentation = await presentation.populate('author', '_id username');
        return res.json(presentation);
    }
    catch(err) {
        next(err);
    }
});

// GET presentations by category
router.get('/category/:category', async (req, res, next) => {
    const { category } = req.params;

    try {
        const presentations = await Presentation.find({ category });
        res.json(presentations);
    } catch (error) {
        next(error);
    }
});
  


module.exports = router;
