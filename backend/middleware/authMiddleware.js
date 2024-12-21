const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    console.log("test middleware");
    
    try {
        const token = req.header("Authorization")?.split(" ")[1]; 
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
        const decoded = jwt.verify(token, "secret-key");
        req.user = decoded;
        console.log("req",req.user)
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token', error: err.message });
    }
};

module.exports = { authMiddleware };
