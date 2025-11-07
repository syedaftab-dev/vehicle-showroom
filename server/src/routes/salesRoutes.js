import { Router } from 'express';

import { authorize, authenticate } from '../middleware/auth.js';

import { createSale, listSales } from '../controllers/salesController.js';

const router = Router();

router.post('/', authenticate, authorize('Manager','Boss'), createSale);

router.get('/', authenticate, listSales);

export default router;

