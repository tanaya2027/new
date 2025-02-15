import DonationModel from "../models/donationmodel.js";
import fs from "fs";
import DonorModel from "../models/donormodel.js";



const add_Dons = async (req, res) => {
    try {
        // Check if user is authenticated
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }

        // Check if a file was uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded. Ensure you are sending a file with key 'image'."
            });
        }

        // Validate required fields
        const requiredFields = ['foodName', 'quantity', 'expiryDateTime', 'location', 'latitude', 'longitude'];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({
                    success: false,
                    message: `Missing required field: ${field}`
                });
            }
        }

        // Creating a new donation
        const donations = new DonationModel({
            foodName: req.body.foodName,
            quantity: req.body.quantity,
            description: req.body.description || '',
            expiryDateTime: req.body.expiryDateTime,
            isVeg: Boolean(req.body.isVeg),
            isNonVeg: Boolean(req.body.isNonVeg),
            location: req.body.location,
            imageUrl: req.file.filename,
            postedby: req.user.username,  // Use authenticated user's username
            isAccepted: false,  // Default value
            needsVolunteer: Boolean(req.body.needsVolunteer),
            acceptedBy: null,  // Initialize as null
            latitude: parseFloat(req.body.latitude),
            longitude: parseFloat(req.body.longitude)
        });

        await donations.save();
        
        res.status(201).json({
            success: true,
            message: "Donation added successfully",
            donation: donations
        });
    } catch (error) {
        console.error("Error adding donation:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Could not add donation. Please try again."
        });
    }
};




const donslist = async (req, res) => {
    try {
        const dons = await DonationModel.find({}).sort({ createdAt: -1 });

        if (dons.length === 0) {
            return res.json({
                success: true,
                message: "No donations found",
                data: []
            });
        }

        res.json({
            success: true,
            data: dons
        });
    } catch (error) {
        console.error("Error fetching donations:", error);
        res.status(500).json({
            success: false,
            message: "Error! Could not fetch list"
        });
    }
};





const removedon = async (req, res) => {
    try {
        const dons = await model1.findById(req.body.id);
        if (!dons) {
            return res.status(404).json({
                success: false,
                message: "Donation not found"
            });
        }

        // Delete the associated image
        const imagePath = `uploads/${dons.imageUrl}`;
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        await DonationModel.findByIdAndDelete(req.body.id);
        res.json({
            success: true,
            message: "Donation removed successfully"
        });
    } catch (error) {
        console.error("Error removing donation:", error);
        res.status(500).json({
            success: false,
            message: "Failed to remove donation"
        });
    }
};




// const acceptDonation = async (req, res) => {
//     try {
//         const { donationId } = req.body;
        
//         const donation = await DonationModel.findByIdAndUpdate(
//             donationId,
//             { isAccepted: true },
//             { new: true }
//         );

//         if (!donation) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Donation not found"
//             });
//         }

//         res.json({
//             success: true,
//             message: "Donation accepted successfully",
//             donation
//         });
//     } catch (error) {
//         console.error("Error accepting donation:", error);
//         res.status(500).json({
//             success: false,
//             message: "Failed to accept donation"
//         });
//     }
// };



const acceptDonation = async (req, res) => {
    try {
        const { donationId, needsVolunteer } = req.body;
        
        // Get current timestamp
        const acceptedAt = new Date();

        // Find and update the donation with all required fields
        const donation = await DonationModel.findByIdAndUpdate(
            donationId,
            { 
                isAccepted: true,
                acceptedBy: req.user.username,
                acceptedAt: acceptedAt,
                needsVolunteer: needsVolunteer || false // Default to false if not provided
            },
            { 
                new: true,
                // Use populate to get donor details if needed
                populate: { 
                    path: 'postedBy',
                    select: 'username' 
                }
            }
        );

        if (!donation) {
            return res.status(404).json({
                success: false,
                message: "Donation not found"
            });
        }

        res.json({
            success: true,
            message: "Donation accepted successfully",
            donation
        });
    } catch (error) {
        console.error("Error accepting donation:", error);
        res.status(500).json({
            success: false,
            message: "Failed to accept donation"
        });
    }
};



export { add_Dons, donslist, removedon, acceptDonation };