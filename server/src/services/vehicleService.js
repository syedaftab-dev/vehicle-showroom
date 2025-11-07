import Joi from 'joi';

import { createVehicle, deleteVehicle, getVehicle, listVehicles, updateVehicle } from '../repositories/vehicleRepo.js';

import { getPaginationParams } from '../utils/pagination.js';

export function validateVehicle(body) {

  const schema = Joi.object({

    brand: Joi.string().required(),

    model: Joi.string().required(),

    price: Joi.number().required(),

    fuel_type: Joi.string().allow(null,''),

    transmission: Joi.string().allow(null,''),

    engine_cc: Joi.number().allow(null),

    mileage: Joi.number().allow(null),

    features: Joi.string().allow(null,''),

    color: Joi.string().allow(null,''),

    manufacturing_year: Joi.number().integer().min(1990).max(2100).allow(null),

    image_url: Joi.string().allow(null,''),

    status: Joi.string().valid('Available','Booked','Sold','OnHold').default('Available'),

    check_in_date: Joi.date().allow(null)

  });

  return schema.validate(body);

}

export async function listVehiclesService(query) {

  const { page, limit, offset } = getPaginationParams(query);

  const filters = { search: query.search || '', status: query.status || '' };

  const result = await listVehicles({ offset, limit, filters });

  return { data: result.rows, page, limit, total: result.total };

}

export async function getVehicleService(id) {

  return await getVehicle(id);

}

export async function createVehicleService(body) {

  const { error, value } = validateVehicle(body);

  if (error) return { error: error.message };

  await createVehicle(value);

  return { ok: true };

}

export async function updateVehicleService(id, body) {

  const { error, value } = validateVehicle(body);

  if (error) return { error: error.message };

  await updateVehicle(id, value);

  return { ok: true };

}

export async function deleteVehicleService(id) {

  await deleteVehicle(id);

  return { ok: true };

}

