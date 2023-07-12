const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Presentation = mongoose.model('Presentation');
const { requireUser } = require('../../config/passport');
const validatePresentationInput = require('../../validations/presentation');

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
                                    .populate("author", "_id username", "comments", "likes");
        return res.json(presentations);
    }
    catch(err) {
        return res.json([]);
    }
});



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

        let presentation = await newPresentation.save();
        presentation = await presentation.populate('author', '_id username');
        return res.json(presentation);
    }
    catch(err) {
        next(err);
    }
});

router.get('/search/:query', async (req, res, next) => {
    const query = req.params.query;
  
    try {
      // Perform search logic based on the query
      // Example: Search presentations by title or category using a case-insensitive regular expression
      const presentations = await Presentation.find({
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { category: { $regex: query, $options: 'i' } }
        ]
      })
        .sort({ createdAt: -1 });
  
      return res.json(presentations);
    } catch (err) {
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


// edit a route
router.patch('/:presentationId', async (req, res, next) => {
    const presentationId = req.params.presentationId;
  
    try {
      const presentation = await Presentation.findById(presentationId);
      if (!presentation) {
        const error = new Error('Presentation not found');
        error.statusCode = 404;
        error.errors = { message: 'No presentation found with that id' };
        return next(error);
      }
  
    
      if (req.body.title) {
        presentation.title = req.body.title;
      }
      if (req.body.category) {
        presentation.category = req.body.category;
      }
      if (req.body.slides) {
        presentation.slides = req.body.slides;
      }
  
      const updatedPresentation = await presentation.save();
      res.json(updatedPresentation);
    } catch (err) {
      next(err);
    }
  });
  

module.exports = router;
