const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationError');

const validateTweetInput = [
    check('text')
        .exists({ checkFalsy: true })
        .isLength({ min: 5, max: 140 })
        .withMessage("Tweet must be between 5 and 140 characters"),
    handleValidationErrors
];

module.exports = validateTweetInput;