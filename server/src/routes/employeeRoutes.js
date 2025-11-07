import { Router } from 'express';

import { authorize, authenticate } from '../middleware/auth.js';

import { createEmployee, deleteEmployee, listEmployees, updateEmployee } from '../controllers/employeeController.js';

const router = Router();

router.get('/', authenticate, authorize('Manager','Boss'), listEmployees);

router.post('/', authenticate, authorize('Boss', 'Manager'), createEmployee);

router.put('/:id', authenticate, authorize('Boss','Manager'), updateEmployee);

router.delete('/:id', authenticate, authorize('Boss'), deleteEmployee);

export default router;

