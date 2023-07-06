const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Presentation = mongoose.model('Presentation');
const Like = mongoose.model('Like');
const { requireUser } = require('../../config/passport');


router.get('/', async (req, res) => {
  try {
    const users = await User.find().populate('likes');
    res.json(users);
  } catch (err) {
    return res.json([]);
  }
});

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
      const likes = await Like.find({ liker: user._id })
                                  .sort({ createdAt: -1 })
                                  .populate("liker", "_id username");
      return res.json(likes);
  }
  catch(err) {
      return res.json([]);
  }
});


// // Like a presentation

router.post('/presentation/:presentationId/like', requireUser, async (req, res, next) => {
  try {
    const presentation = await Presentation.findById(req.params.presentationId);
    
    // Check if the presentation exists
    if (!presentation) {
      const error = new Error('Presentation not found');
      error.statusCode = 404;
      error.errors = { message: "No presentation found with that id" };
      return next(error);
    }
    
    // Create a new Like object
    const newLike = new Like({
      liker: req.user._id, 
      presentation: presentation._id,
      likedType: 'Presentation', 
      likeId: presentation._id
    });
    
    // Save the new Like object
    const savedLike = await newLike.save();
    
    // Update the presentation's like count
    presentation.likeCount += 1;
    await presentation.save();
    
    return res.json(savedLike);
  } catch (err) {
    return next(err);
  }
});

// Like a comment
router.post('/:presentationId/comments/:commentId/likes', async (req, res, next) => {
  try {
    const presentationId = req.params.presentationId;
    const commentId = req.params.commentId;
    const userId = req.user._id;

    const presentation = await Presentation.findById(presentationId);
    if (!presentation) {
      const error = new Error('Presentation not found');
      error.statusCode = 404;
      error.errors = { message: 'No presentation found with that id' };
      return next(error);
    }

    const comment = presentation.comments.get(commentId);
    if (!comment) {
      const error = new Error('Comment not found');
      error.statusCode = 404;
      error.errors = { message: 'No comment found with that id' };
      return next(error);
    }


    const hasLiked = comment.likes.some(like =>
      like.user.toString() === userId.toString()
    );
    if (hasLiked) {
      const error = new Error('User has already liked the comment');
      error.statusCode = 400;
      error.errors = { message: 'User has already liked the comment' };
      return next(error);
    }

    const newLike = new Like({ user: userId });
    await newLike.save();


    comment.likes.push(newLike);
    await presentation.save();

    res.json(presentation);
  } catch (err) {
    next(err);
  }
});

router.delete('/like/:likeId', requireUser, async (req, res, next) => {
  try {
    const like = await Like.findById(req.params.likeId);


    if (!like) {
      const error = new Error('Like not found');
      error.statusCode = 404;
      error.errors = { message: "No like found with that id" };
      return next(error);
    }

    
    if (!like.liker.equals(req.user._id)) {
      const error = new Error('Unauthorized');
      error.statusCode = 401;
      error.errors = { message: "You are not authorized to delete this like" };
      return next(error);
    }


    await Like.deleteOne({ _id: req.params.likeId });

    
    const presentation = await Presentation.findById(like.likeId);
    if (presentation) {
      presentation.likeCount -= 1;
      await presentation.save();
    }

    return res.json(req.params.likeId);
  } catch (err) {
    return next(err);
  }
});

// Delete all likes by a user
// router.delete('/likes', async (req, res, next) => {
//   try {
//     const userId = req.user._id;

//     // Remove likes from presentations
//     await Presentation.updateMany(
//       { 'likes.user': userId },
//       { $pull: { likes: { user: userId } } }
//     );

//     // Remove likes from comments
//     await Presentation.updateMany(
//       { 'comments.likes.user': userId },
//       { $pull: { 'comments.$[].likes': { user: userId } } }
//     );

//     // Delete the likes from the Like model
//     await Like.deleteMany({ user: userId });

//     res.json({ message: 'Likes deleted successfully' });
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;
