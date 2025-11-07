import { createTargetService, deleteTargetService, listTargetsService, updateTargetService } from '../services/targetService.js';

export async function listTargets(req, res) {

  const result = await listTargetsService(req.query);

  res.json(result);

}

export async function createTarget(req, res) {

  const result = await createTargetService(req.body);

  if (result.error) return res.status(400).json({ error: result.error });

  res.status(201).json(result);

}

export async function updateTarget(req, res) {

  const result = await updateTargetService(Number(req.params.id), req.body);

  if (result.error) return res.status(400).json({ error: result.error });

  res.json(result);

}

export async function deleteTarget(req, res) {

  const result = await deleteTargetService(Number(req.params.id));

  res.json(result);

}

