const mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    productName: {
        type: String,
        required: 'Product Name is required.'
    },
    categoryCode: {
        type: String,
        required:'Category Code is Required'
    },

});


mongoose.model('Category', categorySchema);