const mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: 'This field is required.'
    },
    Category: {
        type: String
    },
    Quantity: {
        type: Number,
        required: 'This field is required.'
    },
    Price: {
        type: Number,
        required: 'This field is required.'
    }
});


mongoose.model('Product', productSchema);