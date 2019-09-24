const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const async = require('async');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const {ensureAuthenticated} = require('../helpers/auth');
const router = express.Router();

// Load Order Model
require('../models/Order');
const Order = mongoose.model('orders');

// Admin Order management Route
router.get('/orderManagement', (req, res) => {
  res.render('orders/orderManagement');
});

// User Order Route
router.get('/myorder', (req, res) => {
  res.render('orders/orderManagement');
});

module.exports = router;
