var Product = require('../models/product');

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/shopping',{ useNewUrlParser: true });



var products =
[
    
    new Product({
    imagePath: 'images/card2.jpeg',
    title: 'Rice-been',
    description: 'Awesome rice!!!!',
    price: 10
}),


new Product({
    imagePath: 'images/card4.jpeg',
    title: 'Rice-been',
    description: 'Awesome rice!!!!',
    price: 20
}),


new Product({
    imagePath: 'images/card4.jpeg',
    title: 'Rice-been',
    description: 'Awesome rice!!!!',
    price: 30
}),


new Product({
    imagePath: 'images/card4.jpeg',
    title: 'Rice-been',
    description: 'Awesome rice!!!!',
    price: 40
}), 

new Product({
    imagePath: 'images/card1.png',
    title: 'Coffee-beans',
    description: 'good coffee',
    price: 3
}),

new Product({
    imagePath: 'images/card1.png',
    title: 'Chocolate',
    description: 'good chocolate',
    price: 80
}),

new Product({
    imagePath: 'images/card1.png',
    title: 'Greens',
    description: 'greens',
    price: 90
}), 

new Product({
    imagePath: 'images/card1.png',
    title: 'Coffee-beans',
    description: 'good coffee',
    price: 6
})



];


var done =0;
for(var i=0; i<products.length; i++){
    products[i].save(function(err, result){
        done++;
        if(done === products.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}

