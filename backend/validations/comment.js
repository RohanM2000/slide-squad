const { check, validationResult } = require("express-validator");
const handleValidationErrors = require('./handleValidationError');

const validateCommentInput = [
  check('content')
    .exists({ checkFalsy: true })
    .withMessage("Comment content is required"),
  handleValidationErrors
];

module.exports = validateCommentInput;

