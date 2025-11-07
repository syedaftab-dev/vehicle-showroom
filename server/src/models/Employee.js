import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({

  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  phone: { type: String, required: true },

  address: { type: String },

  salary: { type: Number, required: true },

  joiningDate: { type: Date, required: true }

}, { timestamps: true });

export const Employee = mongoose.model('Employee', employeeSchema);

