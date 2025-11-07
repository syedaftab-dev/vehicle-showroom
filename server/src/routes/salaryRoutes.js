import { Router } from 'express';

import { authorize, authenticate } from '../middleware/auth.js';

import { listSalary, upsertSalary } from '../controllers/salaryController.js';

const router = Router();

router.get('/', authenticate, authorize('Manager','Boss'), listSalary);

router.post('/', authenticate, authorize('Boss'), upsertSalary);

export default router;

