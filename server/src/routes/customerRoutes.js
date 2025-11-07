import { Router } from 'express';

import { authorize, authenticate } from '../middleware/auth.js';

import { createCustomer, deleteCustomer, listCustomers, updateCustomer } from '../controllers/customerController.js';

const router = Router();

router.get('/', authenticate, listCustomers);

router.post('/', authenticate, authorize('Manager','Boss','Employee'), createCustomer);

router.put('/:id', authenticate, authorize('Manager','Boss','Employee'), updateCustomer);

router.delete('/:id', authenticate, authorize('Manager','Boss'), deleteCustomer);

export default router;

