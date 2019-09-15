const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const deliverySchema = new Schema({
    appartmentNum: {
        type: int,
        required: false
    },
    streettNum: {
        type: int,
        required: true
    },
    streetName: {
        type: String,
        required: true
    }
        suburb: {
        type: String,
        required: true
    }
        Postcode: {
        type: int,
        required: true
    }
        State: {
        type: String,
        required: true
    }

});

mongoose.model('delivery', RecipeSchema);
