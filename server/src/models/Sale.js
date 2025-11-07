import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({

  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },

  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },

  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },

  saleDate: { type: Date, default: Date.now },

  revenue: { type: Number, required: true },

  paymentMode: { type: String, required: true }

}, { timestamps: true });

export const Sale = mongoose.model('Sale', saleSchema);

