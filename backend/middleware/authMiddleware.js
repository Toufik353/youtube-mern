const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    console.log("test middleware");
    
    try {
        // Check if the Authorization header exists
        const token = req.header("Authorization")?.split(" ")[1]; 
        
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
        
        console.log("token testing", token);
        
        // Verify token using the secret key from environment variables
        const decoded = jwt.verify(token, "secret-key");  // Make sure to use a secret key from env variables

        console.log("decoded",decoded)
        // Attach user information to the request object
        req.user = decoded;

        console.log("req",req.user)

        // Call the next middleware or route handler
        next();
    } catch (err) {
        // Handle invalid token or expired token error
        return res.status(401).json({ message: 'Invalid or expired token', error: err.message });
    }
};

module.exports = { authMiddleware };
