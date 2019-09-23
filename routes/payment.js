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
  var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'easygomailing@gmail.com',
    pass: 'n20j15n17'
  }
})
var mailOptions = {
  from: 'easygomailing@gmail.com',
  to: req.body.emailaddress,
subject: 'Payment Confirmation',
text: 'Succesful payment!'
}

transporter.sendMail(mailOptions, function(error, info){
if (error) {
console.log(error);
} else {
console.log('Email sent: ' + info.response);
}
});
      
  newUser.save()
  .then(user => {
    req.flash('success_msg', 'Payment Successful, Email Confirmation Sent!');
    res.redirect('/');
  })
  }
});

module.exports = router;
