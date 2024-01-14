const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(403).json({ message: "A token is required for authentication" });
    }
    // remove bearer
    const token = authHeader.split(' ')[1]; 
    if (!token) {
        return res.status(403).json({ message: "A token is required for authentication" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded._id;
    } catch (err) {
        return res.status(401).json({ message: "Invalid Token" });
    }

    next();
};

module.exports = { verifyToken };
