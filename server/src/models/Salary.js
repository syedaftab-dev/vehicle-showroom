import mongoose from 'mongoose';

const salarySchema = new mongoose.Schema({

  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true, unique: true },

  baseSalary: { type: Number, required: true },

  bonus: { type: Number, default: 0 }

}, { timestamps: true });

export const Salary = mongoose.model('Salary', salarySchema);

