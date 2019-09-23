const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {ensureAuthenticated} = require('../helpers/auth');
const router = express.Router();

// Load User Model
require('../models/payment');
const Del = mongoose.model('payment');

// User Login Route
router.get('/payment', (req, res) => {
  res.render('/payment');
});

// Register Form POST
router.post('/payment', (req, res) => {
  let errors = [];
  
  if (!req.body.cardnum.match("[0-9]+")) {
    errors.push({text:'Card Number must be digits'});
  }

  if (req.body.cardnum.length < 16) {
    errors.push({text:'Card Number must be 16 digits'});
  }

  if(errors.length > 0){
    res.render('payment', {
      errors: errors,
      cardnum: req.body.cardnum,
      expiredate: req.body.expiredate,
      securitycode: req.body.securitycode,
      phonenum: req.body.phonenum
  });
  } else {
  const newUser = new Del({
    cardnum: req.body.cardnum,
    expiredate: req.body.expiredate,
    securitycode: req.body.securitycode,
    phonenum: req.body.phonenum
  });
  newUser.save()
  .then(user => {
    res.redirect('/');
  })
  }
});

module.exports = router;
