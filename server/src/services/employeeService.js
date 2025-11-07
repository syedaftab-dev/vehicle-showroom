import Joi from 'joi';

import { createEmployee, deleteEmployee, listEmployees, updateEmployee } from '../repositories/employeeRepo.js';

import { getPaginationParams } from '../utils/pagination.js';

const schema = Joi.object({

  user_id: Joi.number().required(),

  phone: Joi.string().allow('', null),

  address: Joi.string().allow('', null),

  salary: Joi.number().default(0),

  joining_date: Joi.date().allow(null)

});

export async function listEmployeesService(query) {

  const { page, limit, offset } = getPaginationParams(query);

  const search = query.search || '';

  const result = await listEmployees({ offset, limit, search });

  return { data: result.rows, page, limit, total: result.total };

}

export async function createEmployeeService(body) {

  const { error, value } = schema.validate(body);

  if (error) return { error: error.message };

  await createEmployee(value);

  return { ok: true };

}

export async function updateEmployeeService(id, body) {

  const { error, value } = schema.validate(body);

  if (error) return { error: error.message };

  await updateEmployee(id, value);

  return { ok: true };

}

export async function deleteEmployeeService(id) {

  await deleteEmployee(id);

  return { ok: true };

}

