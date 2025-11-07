import Joi from 'joi';

import mongoose from 'mongoose';

import { getPaginationParams } from '../utils/pagination.js';

import { listSales, recordSale } from '../repositories/salesRepo.js';

const schema = Joi.object({

  vehicle_id: Joi.string().required(),

  employee_id: Joi.string().required(),

  customer_id: Joi.string().required(),

  payment_mode: Joi.string().valid('Cash','Finance','Card','Loan').required(),

  revenue: Joi.number().required()

});

export async function recordSaleService(body) {

  const { error, value } = schema.validate(body);

  if (error) return { error: error.message };

  
  // Validate MongoDB ObjectIDs
  if (!mongoose.Types.ObjectId.isValid(value.vehicle_id)) {
    return { error: 'Invalid vehicle ID format' };
  }
  if (!mongoose.Types.ObjectId.isValid(value.employee_id)) {
    return { error: 'Invalid employee ID format' };
  }
  if (!mongoose.Types.ObjectId.isValid(value.customer_id)) {
    return { error: 'Invalid customer ID format' };
  }
  
  try {

    await recordSale(value);

    return { ok: true };

  } catch (e) {

    return { error: e.message };

  }

}

export async function listSalesService(query) {

  const { page, limit, offset } = getPaginationParams(query);

  const result = await listSales({ offset, limit });

  return { data: result.rows, page, limit, total: result.total };

}

