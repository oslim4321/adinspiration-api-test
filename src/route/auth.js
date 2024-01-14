const { loginUser, signUpUser, getUser } = require("../controller/auth");

const express = require('express');
const { verifyToken } = require("../middleware/verifyToken");
const router = express.Router()


router.post('/signup', signUpUser);
router.post('/login', loginUser);
router.get('/getUser', verifyToken, getUser)
module.exports = router