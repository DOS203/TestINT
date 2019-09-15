const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const deliverySchema = new Schema({
    
    appartmentNumber: {
        type: String,
        required: true
    },
    streetNumber: {
        type: String,
        required: true
    },
    streetName: {
        type: String,
        required: true
    },
    suburb: {
        type: String,
        required: true
    },
    postcode: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    }
});

mongoose.model('delivery', deliverySchema);
