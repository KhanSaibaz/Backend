import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1]; 

    try {
        const decoded = jwt.verify(token, "saibazKhan"); 
        console.log(decoded)
        next();
    } catch (error) {
        return res.status(400).json({ message: "Invalid token" });
    }
};

export default authMiddleware;
