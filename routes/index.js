var express = require('express');
var router = express.Router();
var Product = require('../models/product');

var Cart = require('../models/cart');


/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find (function(err, docs){
    var productChunks =[];
    var chunkSize = 6;
    for(var i=0; i<docs.length; i += chunkSize){
      productChunks.push(docs.slice(i, i+chunkSize));
    }
    res.render('shops/index', { title: 'Shopping cart', products : productChunks});
  });

  
});

router.get('/add-to-cart/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  
  Product.findById(productId, function(err, product){
      if(err){
        return res.redirect('/');
      }
       cart.add(product, productId);
       req.session.cart = cart;
       res.redirect('/');
       console.log(req.session.cart);
  });
});

router.get('/shopping-cart', function(req, res, next){
  if(!req.session.cart){
    return res.render('shops/shopping-cart', {products: null});
  }
    var cart = new Cart(req.session.cart);
    res.render('shops/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});




module.exports = router;
