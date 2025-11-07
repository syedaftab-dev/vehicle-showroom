import mongoose from 'mongoose';

const targetSchema = new mongoose.Schema({

  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },

  period: { type: String, required: true },

  targetCount: { type: Number, required: true },

  achievedCount: { type: Number, default: 0 },

  startDate: { type: Date, required: true },

  endDate: { type: Date, required: true },

  status: { type: String, default: 'Active', enum: ['Active', 'Completed', 'Failed'] }

}, { timestamps: true });

export const Target = mongoose.model('Target', targetSchema);

