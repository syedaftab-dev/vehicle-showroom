import Joi from 'joi';

import { listSalary, upsertSalary } from '../repositories/salaryRepo.js';

import { getPaginationParams } from '../utils/pagination.js';

const schema = Joi.object({

  employee_id: Joi.number().required(),

  base_salary: Joi.number().required(),

  bonus: Joi.number().default(0)

});

export async function listSalaryService(query) {

  const { page, limit, offset } = getPaginationParams(query);

  const employee_id = query.employee_id ? Number(query.employee_id) : undefined;

  const result = await listSalary({ offset, limit, employee_id });

  return { data: result.rows, page, limit, total: result.total };

}

export async function upsertSalaryService(body) {

  const { error, value } = schema.validate(body);

  if (error) return { error: error.message };

  await upsertSalary(value);

  return { ok: true };

}

