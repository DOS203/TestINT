const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Create Schema
const ProductSchema = new Schema({
  title:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },

  price:{
    type: String,
  
    required: true
  }
  
});


module.exports = mongoose.model('admin-product', ProdutSchema);
