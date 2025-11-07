import { Router } from 'express';

import { authorize, authenticate } from '../middleware/auth.js';

import { createTarget, deleteTarget, listTargets, updateTarget } from '../controllers/targetController.js';

const router = Router();

router.get('/', authenticate, authorize('Manager','Boss'), listTargets);

router.post('/', authenticate, authorize('Manager','Boss'), createTarget);

router.put('/:id', authenticate, authorize('Manager','Boss'), updateTarget);

router.delete('/:id', authenticate, authorize('Boss'), deleteTarget);

export default router;

