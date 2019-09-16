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
    errors.push({text:'Card Number must be all digits'});
  }

  if (req.body.cardnum.length < 16) {
    errors.push({text:'Card Number must be at least 16 digits'});
  }

  if (!req.body.securitycode.match("[0-9]+")) {
    errors.push({text:'Security Code must be all digits'});
  }

  if (req.body.securitycode.length < 3) {
    errors.push({text:'Security Code must be at least 3 digits'});
  }

  if(errors.length > 0){
    res.render('payment', {
      errors: errors,
      cardnum: req.body.cardnum,
      expiredate: req.body.expiredate,
      securitycode: req.body.securitycode,
      phonenum: req.body.phonenum,
      emailaddress: req.body.emailaddress
  });
  } else {
  const newUser = new Del({
    cardnum: req.body.cardnum,
    expiredate: req.body.expiredate,
    securitycode: req.body.securitycode,
    phonenum: req.body.phonenum,
    emailaddress: req.body.emailaddress
  });
  newUser.save()
  .then(user => {
    req.flash('success_msg', 'Payment Successful');
    res.redirect('/');
  })
  }
});

module.exports = router;
