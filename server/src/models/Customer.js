import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({

  name: { type: String, required: true },

  phone: { type: String, required: true },

  email: { type: String },

  address: { type: String },

  vehicleOfInterest: { type: String },

  status: { type: String, default: 'Pending', enum: ['Pending', 'Contacted', 'Converted', 'Lost'] }

}, { timestamps: true });

export const Customer = mongoose.model('Customer', customerSchema);

