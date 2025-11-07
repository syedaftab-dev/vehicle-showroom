import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({

  brand: { type: String, required: true },

  model: { type: String, required: true },

  price: { type: Number, required: true },

  fuelType: { type: String, required: true },

  transmission: { type: String, required: true },

  engineCc: { type: Number },

  mileage: { type: Number },

  features: { type: String },

  color: { type: String },

  manufacturingYear: { type: Number },

  imageUrl: { type: String },

  status: { type: String, default: 'Available', enum: ['Available', 'Sold', 'Reserved'] },

  checkInDate: { type: Date },

  checkOutDate: { type: Date }

}, { timestamps: true });

export const Vehicle = mongoose.model('Vehicle', vehicleSchema);

