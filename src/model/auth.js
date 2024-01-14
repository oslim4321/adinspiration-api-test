const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    location: {
        city: String,
        country: String
    },
    description: String, 
    pricePerAdVideo: Number, 
    socialLinks: {
        tiktok: String,
        twitter: String, 
        instagram: String, 
        website: String,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    userProfile:{
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    profilePhoto: String, 
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

module.exports = mongoose.model('Users', userSchema);
