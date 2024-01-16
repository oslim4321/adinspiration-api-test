
const express = require('express');
const {  verifyAuthorization } = require("../middleware/verifyToken");
const { userDashboard, deleteUserVideo } = require("../controller/userDashboard");
const router = express.Router()


router.get('/user-dashboard/:user', verifyAuthorization,  userDashboard);

router.delete('/delete-video/:id', verifyAuthorization, deleteUserVideo)

module.exports = router