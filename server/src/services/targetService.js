import Joi from 'joi';

import { createTarget, deleteTarget, listTargets, updateTarget } from '../repositories/targetRepo.js';

import { getPaginationParams } from '../utils/pagination.js';

const schema = Joi.object({

  employee_id: Joi.number().required(),

  period: Joi.string().valid('Weekly','Monthly').required(),

  target_count: Joi.number().integer().min(0).required(),

  start_date: Joi.date().required(),

  end_date: Joi.date().required(),

  achieved_count: Joi.number().integer().min(0).default(0),

  status: Joi.string().default('Pending')

});

export async function listTargetsService(query) {

  const { page, limit, offset } = getPaginationParams(query);

  const employee_id = query.employee_id ? Number(query.employee_id) : undefined;

  const result = await listTargets({ offset, limit, employee_id });

  return { data: result.rows, page, limit, total: result.total };

}

export async function createTargetService(body) {

  const { error, value } = schema.validate(body);

  if (error) return { error: error.message };

  await createTarget(value);

  return { ok: true };

}

export async function updateTargetService(id, body) {

  const { error, value } = schema.validate(body);

  if (error) return { error: error.message };

  await updateTarget(id, value);

  return { ok: true };

}

export async function deleteTargetService(id) {

  await deleteTarget(id);

  return { ok: true };

}

