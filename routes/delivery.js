const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {ensureAuthenticated} = require('../helpers/auth');
const router = express.Router();

// Load User Model
require('../models/delivery');
const Del = mongoose.model('delivery');
const thisDel = new Del;

// User Login Route
router.get('/delivery', (req, res) => {
  res.render('/delivery');
});

// Register Form POST
router.post('/delivery', (req, res) => {
  const newUser = new Del({
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


router.post('/deliveryDT', (req, res) => {
  const newUser = new Del({
    DeliveryDate: req.body.DeliveryDate,
    DeliveryTime: req.body.DeliveryTime
  });
  newUser.save()
  .then(user => {
    res.redirect('/users/payment');
  })
  
});

module.exports = router;
