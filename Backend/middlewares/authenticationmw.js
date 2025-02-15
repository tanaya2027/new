// authMiddleware.js (New file to handle authentication)
import jwt from "jsonwebtoken";
import DonorModel from "../models/donormodel.js";
import RecipientModel from "../models/recipientmodel.js";
import VolunteerModel from "../models/volunteermodel.js";

const authMiddleware = async (req, res, next) => {
    const authHeader = req.header("Authorization");
    
    if (!authHeader) {
        return res.status(401).json({ success: false, message: "Access denied. No token provided." });
    }
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        let user = await DonorModel.findById(decoded.id) || 
                   await RecipientModel.findById(decoded.id) || 
                   await VolunteerModel.findById(decoded.id);
        
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid token." });
        }

        req.user = user; // Attach user to request
        next();
    } catch (error) {
        res.status(400).json({ success: false, message: "Invalid token." });
    }
};

export default authMiddleware;
