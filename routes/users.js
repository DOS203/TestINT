const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const async = require('async');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const {ensureAuthenticated} = require('../helpers/auth');
const router = express.Router();

// Load User Model
require('../models/User');
const User = mongoose.model('users');

// User Login Route
router.get('/login', (req, res) => {
  res.render('users/login');
});
// User areusure Route
router.get('/areusure', ensureAuthenticated , (req, res) => {
  res.render('users/areusure');
});



// User Register Route
router.get('/register', (req, res) => {
  res.render('users/register');
});


// cart route
router.get('/cart', (req, res)=>{
  res.render('users/cart');
});

//User Update Route
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
  User.findOne({
    _id: req.params.id
  })
  .then(user => {
    res.render('users/edit', {
      user:user
    });
  });
});

// User Privilege get
router.get('/privilege', (req, res) => {
  var searchEmail = req.query.searchEmail;
  if (searchEmail == null || searchEmail == "") { // check if search is empty
    var userArray = User.find();
  } else {
    var userArray = User.find({ email: searchEmail}); //search by email
  }
  var allUsers = [];
  userArray.exec(function(err, users){
    if(err)
      return consol.log(err);
    users.forEach(function(user){
      var elem = new Object();
      elem["firstname"] = user.firstname;
      elem["lastname"] = user.lastname;
      elem["email"] = user.email;
      elem["privilege"] = user.privilege;
      elem["id"] = user.id;

      allUsers.push(elem);
      console.log(elem);
    });
    if (allUsers.length == 0) { //check if search failed
      req.flash('error_msg', 'Search Failed');
      res.redirect(303, '/users/privilege');
    } else {
    res.render('users/privilege', {users: allUsers});
  }
  });
});

// User privilege post
router.put('/privilege/:id', (req, res) => { //update privilege level of user
  User.findOne({
    _id: mongoose.Types.ObjectId(req.params.id)
  })
  .then(user => {
    user.privilege = req.body.privilege;
    user.save()
      .then(user => {
        req.flash('success_msg', 'Privilege updated');
        res.redirect(303, '/users/privilege');
      })
  });
});

//Update Profile
router.get('/edit', ensureAuthenticated, (req, res) => {
  res.render('users/edit');
});

// Login Form POST
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Register Form POST
router.post('/register', (req, res) => {
  let errors = [];

  if(req.body.password != req.body.password2){
    errors.push({text:'Passwords do not match'});
  }

  if(req.body.password.length < 4){
    errors.push({text:'Password must be at least 4 characters'});
  }

  if(errors.length > 0){
    res.render('users/register', {
      errors: errors,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2
    });
  } else {
    User.findOne({email: req.body.email})
      .then(user => {
        if(user){
          req.flash('error_msg', 'Email already regsitered');
          res.redirect('/users/register');
        } else {
          const newUser = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            privilege: "1"
          });

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if(err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(user => {
                  req.flash('success_msg', 'You are now registered and can log in');
                  res.redirect('/users/login');
                })
                .catch(err => {
                  console.log(err);
                  return;
                });
            });
          });
        }
      });
  }
});

//Edit Profile
router.put('/:id', ensureAuthenticated, (req, res) => {
  User.findOne({
    _id: req.params.id
  })
  .then(user => {
    // new values
    user.firstname = req.body.firstname,
    user.lastname = req.body.lastname,
    user.email = req.body.email;

    user.save()
      .then(user => {
        req.flash('success_msg', 'Profile updated');
        res.redirect('/');
      })
  });
});

// Delete Account
router.delete('/:id', ensureAuthenticated, (req, res) => {
  User.remove({_id: req.params.id})
    .then(() => {
      req.flash('success_msg', 'Your account has been deactivated');
      res.redirect('/');
    });
});


// Logout User
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});


//User Forgot Password
router.get('/forgot', (req,res) => {
  res.render('users/forgot');
});


//Forgot password Post
router.post('/forgot', function(req,res,next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        const token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
          req.flash('error_msg', 'No account with that email address exists.');
          return res.redirect('/users/forgot');
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      const smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'easyg3044@gmail.com',
          pass: 'Easygo123'
        }
      });
      const mailOptions = {
        to: user.email,
        from: 'easyg3044@gmail.com',
        subject: 'Reset Your EasyGo Password',
        text: 'Hi ' + user.firstname + ' Forgot your EasyGo password? \n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/users/reset/' + token + '\n\n' + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n' +
          '\n\n' + '*To ensure your EasyGo account remains as safe and secure as possible, this password reset request expires in 48 hours.'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        console.log('mail sent');
        req.flash('success_msg', 'We sent you a link to reset your password.');
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/users/forgot');
  });
});
//reset router
router.get('/reset/:token', function(req, res) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      req.flash('error_msg', 'Password reset link is invalid or has expired.');
      return res.redirect('/users/forgot');
    }
    res.render('users/reset',{token: req.params.token});
  });
});

router.post('/reset/:token', function(req, res) {
  async.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          req.flash('error_msg', 'Password reset link is invalid or has expired.');
          return res.redirect('back');
        }
        if(req.body.password === req.body.confirm) {
          user.setPassword(req.body.password, function(err) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;

            user.save(function(err) {
              req.logIn(user, function(err) {
                done(err, user);
              });
            });
          })
        } else {
            req.flash("error_msg", "Passwords do not match.");
            return res.redirect('back');
        }
      });
    },
    function(user, done) {
      const smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'easyg3044@gmail.com',
          pass: 'Easygo123'
        }
      });
      const mailOptions = {
        to: user.email,
        from: 'easyg3044@gmail.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        console.log('mail sent for Succ');
        req.flash('success_msg', 'Success! Your password has been changed.');
        done(err);
      });
    }
  ], function(err) {
    res.redirect('/');
  });
});


module.exports = router;
