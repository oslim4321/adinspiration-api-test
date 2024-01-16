const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    brandName: {
        type: String,
        required: true,
        unique: true
    },
    logoUrl: {
        type: String,
        required: true
    },
    thumbnailUrl: String,
    category: {
        type: [String],
        required: true
    },    
    adText: String

});

module.exports = mongoose.model('Brand', brandSchema);
