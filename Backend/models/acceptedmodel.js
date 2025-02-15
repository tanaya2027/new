import mongoose from 'mongoose';

const acceptedDonationSchema = new mongoose.Schema({
  foodName: { type: String, required: true },
  quantity: { type: Number, required: true },
  description: { type: String, required: true },
  expiryDateTime: { type: String, required: true },
  isVeg: { type: Boolean, default: false },
  isNonVeg: { type: Boolean, default: false },
  imageUrl: { type: String, required:true },
  location: { type: String , required:true},
  latitude: { type: Number , required:true},
  longitude: { type: Number, required:true },
  originalDonationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Donation', required: true },
  donorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Donor', required: true },
  acceptedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipient', required: true },
  acceptedAt: { type: Date, default: Date.now },
  needsVolunteer:{type: Boolean, default: false },
  isAccepted: {
    type: Boolean,
    default: false
},
acceptedAt: {
    type: Date,
    default: null
},
needsVolunteer: {
    type: Boolean,
    default: false
},
postedBy: {
    type: String,
    required: true
}
}, {
timestamps: true
});

const AcceptedDonation = mongoose.model('AcceptedDonation', acceptedDonationSchema);
export default AcceptedDonation;