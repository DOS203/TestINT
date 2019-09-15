const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  email:{
    type: String,
    required: true
  },
  first_name:{
    type: String,
    required: true
  },
  last_name:{
    type: String,
    required: true
  },
  address:{
    type: String,
    required: true
  },
  city:{
    type: String,
    required: true
  },
  postcode:{
    type: String,
    required: true
  },
  card_num:{
    type: String,
    required: true
  },
    expire_date:{
    type: String,
    required: true
  },
  security_code:{
    type: String,
    required: false
  },
  phone_num:{
    type: String,
    required: true
  },
  price:{
    type: String,
    required: true
  },
});

mongoose.model('payment', PaymentSchema);