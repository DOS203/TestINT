const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {ensureAuthenticated} = require('../helpers/auth');
const router = express.Router();

// Load User Model
require('../models/delivery');
const Del = mongoose.model('delivery');

// User Login Route
router.get('/delivery', (req, res) => {
  res.render('/delivery');
});

// Register Form POST
router.post('/delivery', (req, res) => {
  const newUser = new Del({
    appartmentNumber: req.body.appartmentNumber,
    streetNumber: req.body.streetNumber,
    streetName: req.body.streetName,
    suburb: req.body.suburb,
    postcode: req.body.postcode,
    state: req.body.state
  });
  newUser.save()
  .then(user => {
    res.redirect('/courier');
  })
  
});

module.exports = router;
