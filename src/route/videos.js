
const express = require('express');
const { getAllVideos, createVideo } = require('../controller/videos');
const router = express.Router()

router.get('/get-videos', getAllVideos)
router.post('/create-video', createVideo)

module.exports = router