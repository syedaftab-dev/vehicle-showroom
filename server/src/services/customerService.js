import Joi from 'joi';

import { createCustomer, deleteCustomer, listCustomers, updateCustomer } from '../repositories/customerRepo.js';

import { getPaginationParams } from '../utils/pagination.js';

const schema = Joi.object({

  name: Joi.string().required(),

  phone: Joi.string().allow('', null),

  email: Joi.string().email().allow('', null),

  address: Joi.string().allow('', null),

  vehicle_of_interest: Joi.string().allow('', null),

  status: Joi.string().valid('Interested','Purchased','OnHold','LoanProcess').default('Interested')

});

export async function listCustomersService(query) {

  const { page, limit, offset } = getPaginationParams(query);

  const search = query.search || '';

  const result = await listCustomers({ offset, limit, search });

  return { data: result.rows, page, limit, total: result.total };

}

export async function createCustomerService(body) {

  const { error, value } = schema.validate(body);

  if (error) return { error: error.message };

  await createCustomer(value);

  return { ok: true };

}

export async function updateCustomerService(id, body) {

  const { error, value } = schema.validate(body);

  if (error) return { error: error.message };

  await updateCustomer(id, value);

  return { ok: true };

}

export async function deleteCustomerService(id) {

  await deleteCustomer(id);

  return { ok: true };

}

