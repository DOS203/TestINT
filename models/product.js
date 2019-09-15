var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    imagePath:{ type: String, required: true},
    cardtitle:{ type: String, required: true},
    cardtext:{ type: String, required: true},
    price:{ type: Number, required: true}
});

module.exports = mongoose.model('Product', schema);