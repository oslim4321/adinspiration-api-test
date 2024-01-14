const fs = require('fs');
const mongoose = require('mongoose');
const User = require('./src/model/auth');


mongoose.connect('mongodb://127.0.0.1:27017/adinspiration', {
  useNewUrlParser: true, 
  useUnifiedTopology: true
});

fs.readFile('./users.json', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }
  
  const jsonData = JSON.parse(data);
  jsonData['Creators videos'].forEach(async (creator) => {
    console.log(creator);
    const newUser = new User({
      firstName: creator['First Name'],
      lastName: creator['Last name'],
      location: {
        city: creator['City, Country'].split(',')[0].trim(),
        country: creator['City, Country'].split(',')[1].trim()
      },
      description: creator['Description from their website'],
      pricePerAdVideo: creator['Price for 1 ad video (just the number)'],
      socialLinks: {
        tiktok: creator['Tiktok Link\n'],
        twitter: creator['Twitter link'],
        instagram: creator['Instagram Link'],
        website: creator['Website link']
      },
      email: creator['Email'],
      profilePhoto: creator['Photo profile'],
      password: Math.floor(Math.random() * 5)
    });

    try {
      await newUser.save();
    } catch (saveErr) {
      console.error('Error saving the user:', saveErr);
    }
  });
});
