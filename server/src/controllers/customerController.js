import { createCustomerService, deleteCustomerService, listCustomersService, updateCustomerService } from '../services/customerService.js';

export async function listCustomers(req, res) {

  const result = await listCustomersService(req.query);

  res.json(result);

}

export async function createCustomer(req, res) {

  const result = await createCustomerService(req.body);

  if (result.error) return res.status(400).json({ error: result.error });

  res.status(201).json(result);

}

export async function updateCustomer(req, res) {

  const result = await updateCustomerService(Number(req.params.id), req.body);

  if (result.error) return res.status(400).json({ error: result.error });

  res.json(result);

}

export async function deleteCustomer(req, res) {

  const result = await deleteCustomerService(Number(req.params.id));

  res.json(result);

}

