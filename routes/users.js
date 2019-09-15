const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {ensureAuthenticated} = require('../helpers/auth');
const router = express.Router();

// Load User Model
require('../models/User');
const User = mongoose.model('users');

// User Login Route
router.get('/login', (req, res,next) => {
  res.render('users/login');
 
});
//User forgot password
router.get('/forgot', (req, res) => {
  res.render('users/forgot');
  
});

//User forget password POST



// User Register Route
router.get('/register', (req, res) => {
  res.render('users/register');

});

// User Payment Route
router.get('/payment', (req, res) => {
  res.render('users/payment');
});

// User Payment POST
router.post('/payment', (req, res, next) => {
  req.flash('success_msg', 'Payment Successful');
  res.redirect('/');
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
  return res.status(403);
});

// User Privilege get
router.get('/privilege', (req, res) => {
  res.render('users/privilege');
});

// User areusure get
router.get('/areusure', (req, res) => {
  res.render('users/areusure');
});


// User privilege POST
router.post('/privilege', (req, res, next) => {
  User.findOne({id: req.body.id})
  .then(user => {
    user.privilege = req.body.privilege;
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
            password: req.body.password
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

module.exports = router;
