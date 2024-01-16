const yup = require('yup');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const { signUpSchema } = require('../validation');

const generateToken = (userId) => {
    return jwt.sign({ _id: userId }, process.env.JWT_SECRET, { expiresIn: '1w' }); // Adjust expiresIn as needed
};


const signUpUser = async (req, res) => {
    try {
        await signUpSchema.validate(req.body);
        
        const { firstName, lastName, city, country, description, pricePerAdVideo, socialLinks, email, profilePhoto, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

       const newUser = new User({
            firstName,
            lastName,
            location: { city, country },
            description,
            pricePerAdVideo,
            socialLinks,
            email,
            profilePhoto,
            password
        });

        await newUser.save();
        const token = generateToken(newUser._id);
        res.status(201).json({ message: 'Account created successfully', token });
    } catch (error) {
        console.log(error);
        if (error instanceof yup.ValidationError) {
            return res.status(400).json({ errors: error.errors });
        }
        res.status(500).json({ message: 'Error creating account' });
    }
};


const loginUser = async(req, res) => {
try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: 'Invalid credentials'});
        }
        const token = generateToken(user._id);
        res.status(201).json({ message: 'Login successfully', token });
    } catch (error) {
        res.status(500).json(error);
    }
}

const getUser = async(req, res) => {
    const id = req.user
   try {
    const user = await User.findById(id).select('-password')
    console.log(user);
    if (!user) {
        return res.status(404).json({ message: 'user not found'})
    }
    res.status(200).json(user)
   } catch (error) {
    
   }
}

const updateUser = async(req, res) => {
    try {
        const userId = req.params.user;
        const {  city, country, description, pricePerAdVideo, socialLinks, profilePhoto } = req.body;
        const updatedData = {city, country, description, pricePerAdVideo, socialLinks, profilePhoto }
        const updatedUserDetails = await User.findByIdAndUpdate(userId, updatedData, { new: true });

        if (!updatedUserDetails) {
            return res.status(404).json({message: 'User not found'});
        }

        res.status(200).json({message:updatedUserDetails});
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
}





module.exports = {signUpUser, loginUser, getUser, updateUser};
