import { createVehicleService, deleteVehicleService, getVehicleService, listVehiclesService, updateVehicleService } from '../services/vehicleService.js';

export async function listVehicles(req, res) {

  const result = await listVehiclesService(req.query);

  res.json(result);

}

export async function getVehicle(req, res) {

  const data = await getVehicleService(Number(req.params.id));

  if (!data) return res.status(404).json({ error: 'Not found' });

  res.json(data);

}

export async function createVehicle(req, res) {

  const result = await createVehicleService(req.body);

  if (result.error) return res.status(400).json({ error: result.error });

  res.status(201).json(result);

}

export async function updateVehicle(req, res) {

  const result = await updateVehicleService(Number(req.params.id), req.body);

  if (result.error) return res.status(400).json({ error: result.error });

  res.json(result);

}

export async function deleteVehicle(req, res) {

  const result = await deleteVehicleService(Number(req.params.id));

  res.json(result);

}

