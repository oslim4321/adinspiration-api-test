const mongoose = require('mongoose');

const UserAdVideos = new mongoose.Schema({
    videoUrl: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    brandName: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
});

module.exports = mongoose.model('UserAdVideos', UserAdVideos);
