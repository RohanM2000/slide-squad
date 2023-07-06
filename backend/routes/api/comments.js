const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Like = mongoose.model('Like');
const Presentation = mongoose.model('Presentation');
const Comment = mongoose.model('Comment');
const { requireUser } = require('../../config/passport');


// Create a new comment
router.post('/:presentationId/comments', requireUser, async (req, res, next) => {
  try {
    const presentationId = req.params.presentationId;
    const { content, parent_id } = req.body;

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

    // Add the comment to the presentation's comments array
    presentation.comments.push(comment._id);
    await presentation.save();

    return res.json(comment);
  } catch (err) {
    next(err);
  }
});

// Reply to a comment
router.post('/:presentationId/comments/:commentId/reply', requireUser, async (req, res, next) => {
  try {
    const presentationId = req.params.presentationId;
    const commentId = req.params.commentId;
    const { content } = req.body;

    const presentation = await Presentation.findById(presentationId);
    if (!presentation) {
      const error = new Error('Presentation not found');
      error.statusCode = 404;
      error.errors = { message: 'No presentation found with that id' };
      return next(error);
    }

    const parentComment = await Comment.findById(commentId);
    if (!parentComment) {
      const error = new Error('Comment not found');
      error.statusCode = 404;
      error.errors = { message: 'No comment found with that id' };
      return next(error);
    }

    const newReply = new Comment({
      user: req.user._id,
      content,
      parent_id: commentId
    });

    const reply = await newReply.save();

    // Add the reply to the parent comment's replies array
    parentComment.replies.push(reply._id);
    await parentComment.save();

    return res.json(reply);
  } catch (err) {
    next(err);
  }
});

// Edit a comment
router.patch('/:presentationId/comments/:commentId', requireUser, async (req, res, next) => {
  try {
    const presentationId = req.params.presentationId;
    const commentId = req.params.commentId;
    const { content } = req.body;

    const presentation = await Presentation.findById(presentationId);
    if (!presentation) {
      const error = new Error('Presentation not found');
      error.statusCode = 404;
      error.errors = { message: 'No presentation found with that id' };
      return next(error);
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      const error = new Error('Comment not found');
      error.statusCode = 404;
      error.errors = { message: 'No comment found with that id' };
      return next(error);
    }

    // Check if the user is the owner of the comment or has sufficient privileges
    if (comment.user.toString() !== req.user._id.toString()) {
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
router.delete('/:presentationId/comments/:commentId', requireUser, async (req, res, next) => {
  try {
    const presentationId = req.params.presentationId;
    const commentId = req.params.commentId;

    const presentation = await Presentation.findById(presentationId);
    if (!presentation) {
      const error = new Error('Presentation not found');
      error.statusCode = 404;
      error.errors = { message: 'No presentation found with that id' };
      return next(error);
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      const error = new Error('Comment not found');
      error.statusCode = 404;
      error.errors = { message: 'No comment found with that id' };
      return next(error);
    }

    // Check if the user is the owner of the comment or has sufficient privileges
    if (comment.user.toString() !== req.user._id.toString()) {
      const error = new Error('Unauthorized');
      error.statusCode = 401;
      error.errors = { message: 'You are not authorized to delete this comment' };
      return next(error);
    }

    // Remove the comment from the parent's comments array
    if (comment.parent_id) {
      const parentComment = await Comment.findById(comment.parent_id);
      if (parentComment) {
        parentComment.replies.pull(comment._id);
        await parentComment.save();
      } else {
        presentation.comments.pull(comment._id);
        await presentation.save();
      }
    }

    // Delete the comment
    await comment.remove();

    return res.json({ message: 'Comment deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;