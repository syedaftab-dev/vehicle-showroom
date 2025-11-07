import { createEmployeeService, deleteEmployeeService, listEmployeesService, updateEmployeeService } from '../services/employeeService.js';

export async function listEmployees(req, res) {

  const result = await listEmployeesService(req.query);

  res.json(result);

}

export async function createEmployee(req, res) {

  const result = await createEmployeeService(req.body);

  if (result.error) return res.status(400).json({ error: result.error });

  res.status(201).json(result);

}

export async function updateEmployee(req, res) {

  const result = await updateEmployeeService(Number(req.params.id), req.body);

  if (result.error) return res.status(400).json({ error: result.error });

  res.json(result);

}

export async function deleteEmployee(req, res) {

  const result = await deleteEmployeeService(Number(req.params.id));

  res.json(result);

}

