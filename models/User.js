const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

// Create Schema
const UserSchema = mongoose.Schema({
  firstname:{
    type: String,
    required: true
  },
  lastname:{
    type: String,
    required: true
  },

  email:{
    type: String,
    unique: true,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  streetName:{
    type: String,
    required: false
  },
  avatar: {
    type: Buffer
  },
  date: {
    type: Date,
    default: Date.now
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,

  privilege: {
    type: String,
    required: false
  }
  // id:{
  //   type: String,
  //   required: false
  // },
});
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', UserSchema);
