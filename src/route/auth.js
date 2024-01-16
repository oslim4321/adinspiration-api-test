const { loginUser, signUpUser, getUser, updateUser } = require("../controller/auth");

const express = require('express');
const { verifyToken, verifyAuthorization } = require("../middleware/verifyToken");
const router = express.Router()


router.post('/signup', signUpUser);
router.post('/login', loginUser);
router.get('/getUser', verifyToken, getUser)
router.patch('/updateUser/:user', verifyAuthorization, updateUser)
module.exports = router