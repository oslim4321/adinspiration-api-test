const  mongoose  = require("mongoose");
const User = require("../model/user");
const UserAdVideo = require('../model/UserAdVideos')

const userDashboard = async (req, res) => {
    const userId = req.params.user;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const videos = await UserAdVideo.find({ user: userId }); 
        if (videos.length < 1) {
            return res.status(404).json({ message: 'No Videos' });
        }
        const uniqueBrandNames = await UserAdVideo.aggregate([
            { $match: { user: new mongoose.Types.ObjectId(userId) } },
            { $group: { _id: "$brandName" } },
            { $project: { _id: 0, brandName: "$_id" } }
        ]);
        res.status(200).json({
            user: user,
            videos: videos,
            brandName: uniqueBrandNames
        });
    } catch (error) {
        console.error('Error fetching user dashboard:', error);
        res.status(500).json({ message: 'Error fetching user dashboard' });
    }
};


const deleteUserVideo =(req, res)=>{
    console.log('hhdd', req.params.id);
}

module.exports = { userDashboard, deleteUserVideo };
