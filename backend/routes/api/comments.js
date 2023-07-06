const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Like = mongoose.model('Like');
const Presentation = mongoose.model('Presentation');
const Comment = mongoose.model('Comment');
const { requireUser } = require('../../config/passport');
// const validatePresentationInput = require('../../validations/presentation');
const validateCommentInput = require('../../validations/comment');


// Create a new comment
router.post('/', requireUser, validateCommentInput, async (req, res, next) => {
  try {
    const { content, parent_id, presentationId } = req.body;

    const presentation = await Presentation.findById(presentationId);
    if (!presentation) {
      const error = new Error('Presentation not found');
      error.statusCode = 404;
      error.errors = { message: 'No presentation found with that id' };
      return next(error);
    }
    const newComment = new Comment({
      user: req.user._id,
      content,
      parent_id
    });

    const comment = await newComment.save();


    return res.json(comment);
  } catch (err) {
    next(err);
  }
});

// Edit a comment
router.patch('/:commentId', requireUser, async (req, res, next) => {
  try {
    const commentId = req.params.commentId;
    const { content } = req.body;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      const error = new Error('Comment not found');
      error.statusCode = 404;
      error.errors = { message: 'No comment found with that id' };
      return next(error);
    }

    // Check if the user is the owner of the comment or has sufficient privileges
    if (comment.user._id.toString() !== req.user._id.toString()) {
      const error = new Error('Unauthorized');
      error.statusCode = 401;
      error.errors = { message: 'You are not authorized to edit this comment' };
      return next(error);
    }

    comment.content = content;
    const updatedComment = await comment.save();

    return res.json(updatedComment);
  } catch (err) {
    next(err);
  }
});

// Delete a comment
router.delete('/:commentId', requireUser, async (req, res, next) => {
  try {
    const commentId = req.params.commentId;

    const presentation = await Presentation.findById(presentationId);

    const comment = await Comment.findById(commentId);
    if (!comment) {
      const error = new Error('Comment not found');
      error.statusCode = 404;
      error.errors = { message: 'No comment found with that id' };
      return next(error);
    }

    // Check if the user is the owner of the comment or has sufficient privileges
    if (comment.user._id.toString() !== req.user._id.toString()) {
      const error = new Error('Unauthorized');
      error.statusCode = 401;
      error.errors = { message: 'You are not authorized to delete this comment' };
      return next(error);
    }

    // Delete the comment
    await comment.remove();

    return res.json({ message: 'Comment deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;