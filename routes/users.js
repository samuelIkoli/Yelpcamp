const express = require('express');
const router = express.Router();
const passport = require('passport')
const LocalStrategy = require('passport-local');
const catchAsync = require('../utils/catchAsync')
const User = require('../models/user');
const { request } = require('express');
const users = require('../controllers/users')
const { storage } = require('../cloudinary')
const multer = require('multer');
const upload = multer({ storage })
const { createPesova, getAllPesovas, updatePesova, createCoverPhoto, getPesova } = require('../controllers/pesova')

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

router.get('/logout', users.logout)

router.post("/pesova", upload.array('image', 10), createPesova);
router.patch("/pesova/:id", updatePesova);
router.get("/pesova", getAllPesovas);
router.get("/pesova/:id", getPesova);
router.post("/pesova-cover-photo/:id", upload.array('image', 1), createCoverPhoto);


module.exports = router;