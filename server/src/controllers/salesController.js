import { listSalesService, recordSaleService } from '../services/salesService.js';

export async function createSale(req, res) {

  const result = await recordSaleService(req.body);

  if (result.error) return res.status(400).json({ error: result.error });

  res.status(201).json(result);

}

export async function listSales(req, res) {

  const result = await listSalesService(req.query);

  res.json(result);

}

