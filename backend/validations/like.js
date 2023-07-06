const { check, validationResult } = require("express-validator");
const handleValidationErrors = require('./handleValidationError');
const Presentation = require('../models/presentation');
const Comment = require('../models/comment');

const validateLikeInput = [
  check('user')
    .exists({ checkFalsy: true })
    .withMessage("Like user is required")
    .custom(async (user, { req }) => {
      const presentationId = req.params.presentationId;
      const commentId = req.params.commentId;

      if (presentationId) {
        const presentation = await Presentation.findById(presentationId);
        if (presentation.likes.includes(user)) {
          throw new Error("You have already liked this presentation");
        }
      } else if (commentId) {
        const comment = await Comment.findById(commentId);
        if (comment.likes.includes(user)) {
          throw new Error("You have already liked this comment");
        }
      }

      return true;
    }),
  handleValidationErrors
];

module.exports = validateLikeInput;
