const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationError');

const validatePresentationInput = [
    check('title')
      .exists({ checkFalsy: true })
      .isLength({ min: 5 })
      .withMessage("Presentation title must be at least 5 characters"),
    check('slides')
      .custom((slides) => {
        if (!slides || Object.keys(slides).length === 0) {
          throw new Error("At least one slide is required");
        }
        return true;
      }),
    // check('slides.*.title')
    //   .exists({ checkFalsy: true })
    //   .withMessage("Slide title is required"),
    // check('slides.*.content')
    //   .exists({ checkFalsy: true })
    //   .withMessage("Slide content is required"),
    handleValidationErrors
  ];
  
  module.exports = validatePresentationInput;