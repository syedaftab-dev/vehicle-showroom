import { listSalaryService, upsertSalaryService } from '../services/salaryService.js';

export async function listSalary(req, res) {

  const result = await listSalaryService(req.query);

  res.json(result);

}

export async function upsertSalary(req, res) {

  const result = await upsertSalaryService(req.body);

  if (result.error) return res.status(400).json({ error: result.error });

  res.json(result);

}

