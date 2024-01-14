const mongoose = require('mongoose');

const brandVideoSchema = new mongoose.Schema({
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    description: String
});

module.exports = mongoose.model('BrandVideo', brandVideoSchema);
