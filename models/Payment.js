const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const paymentSchema = new Schema({
  cardnum:{
    type: String,
    required: true
  },
  expiredate:{
    type: String,
    required: true
  },
  securitycode:{
    type: String,
    required: false
  },
  phonenum:{
    type: String,
    required: true
  },
  emailaddress:{
    type: String,
    required: true
  },
});

mongoose.model('payment', paymentSchema);