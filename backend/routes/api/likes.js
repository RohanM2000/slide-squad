const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Presentation = mongoose.model('Presentation');
const Like = mongoose.model('Like');
const { requireUser } = require('../../config/passport');

// Like a presentation
router.post('/:presentationId/likes', async (req, res, next) => {
  try {
    const presentationId = req.params.presentationId;
    const userId = req.user._id;

    const presentation = await Presentation.findById(presentationId);
    if (!presentation) {
      const error = new Error('Presentation not found');
      error.statusCode = 404;
      error.errors = { message: 'No presentation found with that id' };
      return next(error);
    }

    // Check if the user has already liked the presentation
    const alreadyLiked = presentation.likes.some(like =>
      like.user.toString() === userId.toString()
    );
    if (alreadyLiked) {
      const error = new Error('You have already liked this presentation');
      error.statusCode = 400;
      error.errors = { message: 'You have already liked this presentation' };
      return next(error);
    }

    // Create a new like
    const newLike = new Like({ user: userId });
    await newLike.save();

    // Add the like to the presentation
    presentation.likes.push(newLike);
    await presentation.save();

    return res.json(presentation);
  } catch (err) {
    next(err);
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

    // Check if the user has already liked the comment
    const hasLiked = comment.likes.some(like =>
      like.user.toString() === userId.toString()
    );
    if (hasLiked) {
      const error = new Error('User has already liked the comment');
      error.statusCode = 400;
      error.errors = { message: 'User has already liked the comment' };
      return next(error);
    }

    // Create a new like
    const newLike = new Like({ user: userId });
    await newLike.save();

    // Add the like to the comment
    comment.likes.push(newLike);
    await presentation.save();

    res.json(presentation);
  } catch (err) {
    next(err);
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
