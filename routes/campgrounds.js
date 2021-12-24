const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware')
const { index, renderNewForm, createCampground, showCampground, renderEditForm, updateCampground, deleteCampground } = require('../controllers/campgrounds')
const { storage } = require('../cloudinary')
const multer = require('multer');
const upload = multer({ storage })

router.route('/')
    .get(catchAsync(index))
    .post(isLoggedIn, upload.array('image', 4), validateCampground, catchAsync(createCampground));
// .post(upload.array('image'), (req, res) => {
//     console.log(req.body, req.files);
//     res.send('it worked')
// })


router.get('/new', isLoggedIn, renderNewForm)

router.route('/:id')
    .get(catchAsync(showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(updateCampground))
    .delete(isAuthor, catchAsync(deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(renderEditForm))

module.exports = router;