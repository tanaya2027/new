import mongoose from "mongoose";

const donSchema = new mongoose.Schema({
    foodName: { type: String, required: true },
    quantity: { type: String, required: true },
    description: { type: String, required: true },
    expiryDateTime: { type: String, required: true },
    isVeg:{ type: Boolean, default: false },
    isNonVeg:{ type: Boolean, default: false },
    location: { type: String, required: true },
    imageUrl: { type: String, required: true }, // Added organization name
    createdAt: { type: Date, default: Date.now },// Added organization name
    latitude: { type: Number, required: true },   // Added for location filtering
    longitude: { type: Number, required: true } ,  // Added for location filtering
    isAccepted: { type: Boolean, default: false },
    needsVolunteer: { type: Boolean,default: false},
    acceptedBy: {type: String, ref: 'Recipient', default: null},
}, {
    timestamps: true
});

const DonationModel = mongoose.models.donations || mongoose.model("donations", donSchema);
export default DonationModel;