const Mux = require('@mux/mux-node');
const BrandVideo = require('../model/brandVideoSchema')
const UserVideo =  require('../model/UserAdVideos')

    // Create Mux Video and Data instances
const { Video } = new Mux(process.env.ACCESS_TOKEN, process.env.SECRET_KEY);


const createVideo = async (req, res) => {
    const { videoUrl } = req.body;
    if (!videoUrl) {
        return res.status(400).json({ message: 'Video URL is required' });
    }

    try {
        const asset = await Video.Assets.create({
            input: videoUrl,
            playback_policy: ['public'] // Set playback policy as needed (public or signed)
        });
        res.status(201).json({ 
            message: 'Video created successfully',
            asset: asset 
        });
    } catch (error) {
        console.error('Error creating video in Mux:', error);
        res.status(500).json({ message: 'Error creating video' });
    }
};



const getAllVideos = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const [brandVideos, userVideos] = await Promise.all([
            BrandVideo.find().skip(skip).limit(limit), 
            UserVideo.find().skip(skip).limit(limit)   
          ]);
          const result = [...brandVideos, ...userVideos];
          res.status(200).json(result);
        console.log(result.length);
    } catch (error) {
        console.error('Error fetching videos from Mux:', error);
        res.status(500).json({ message: 'Error fetching videos' });
    }
};


module.exports = { getAllVideos, createVideo };


// const getAllVideos = async (req, res) => {
//     try {
//         const assets = await Video.Assets.list();
//         const formattedAssets = assets.map(asset => ({
//             id: asset.id,
//             playbackId: asset.playback_ids[0].id,
//             status: asset.status,
//             duration: asset.duration,
//             resolution: {
//                 width: asset.tracks.find(t => t.type === 'video')?.max_width,
//                 height: asset.tracks.find(t => t.type === 'video')?.max_height,
//             },
//             aspectRatio: asset.aspect_ratio,
//             createdAt: asset.created_at,
//         }));
//         res.json(formattedAssets);
//     } catch (error) {
//         console.error('Error fetching videos from Mux:', error);
//         res.status(500).json({ message: 'Error fetching videos' });
//     }
// };
