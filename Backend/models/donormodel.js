import mongoose from "mongoose";

const donorSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contact: { type: String, required: true },
    currentPassword: { type: String, required: true },
    userType: { type: String, required: true, default: "donor" },
    about: { type: String },
    profileImage: { type: String, required: true },
    orgName: { type: String, required: true },
    latitude: {type: Number,required: false},
    longitude: {type: Number,required: false}
        
});

const DonorModel = mongoose.models.donor || mongoose.model("donor", donorSchema);
export default DonorModel;
