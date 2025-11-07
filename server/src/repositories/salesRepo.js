import { Sale } from '../models/Sale.js';

import { Vehicle } from '../models/Vehicle.js';

export async function recordSale({ vehicle_id, employee_id, customer_id, payment_mode, revenue }) {

  await Sale.create({
    vehicleId: vehicle_id,
    employeeId: employee_id,
    customerId: customer_id,
    paymentMode: payment_mode,
    revenue: revenue,
    saleDate: new Date()
  });

  await Vehicle.findByIdAndUpdate(vehicle_id, { 
    status: 'Sold', 
    checkOutDate: new Date() 
  });

  return { ok: true };

}

export async function listSales({ offset, limit }) {

  const total = await Sale.countDocuments();

  const sales = await Sale.find()
    .populate('vehicleId', 'brand model')
    .populate({ path: 'employeeId', populate: { path: 'userId', select: 'name' } })
    .populate('customerId', 'name')
    .sort({ saleDate: -1 })
    .skip(offset)
    .limit(limit)
    .lean();

  const rows = sales.map(s => ({
    ID: s._id,
    SALE_DATE: s.saleDate,
    REVENUE: s.revenue,
    PAYMENT_MODE: s.paymentMode,
    BRAND: s.vehicleId?.brand || '',
    MODEL: s.vehicleId?.model || '',
    EMPLOYEE_NAME: s.employeeId?.userId?.name || '',
    CUSTOMER_NAME: s.customerId?.name || ''
  }));

  return { rows, total };

}

