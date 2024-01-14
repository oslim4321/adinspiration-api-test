const yup = require('yup');


const signUpSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    location: yup.object().shape({
        city: yup.string(),
        country: yup.string()
    }),
    description: yup.string(),
    pricePerAdVideo: yup.number(),
    socialLinks: yup.object().shape({
        tiktok: yup.string().url('Invalid TikTok URL'),
        twitter: yup.string().url('Invalid Twitter URL'),
        instagram: yup.string().url('Invalid Instagram URL'),
        website: yup.string().url('Invalid website URL')
    }),
    email: yup.string().email('Invalid email').required('Email is required'),
    profilePhoto: yup.string().url('Invalid profile photo URL'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters long')
});

module.exports = signUpSchema;



module.exports = {signUpSchema}