import { Router } from 'express';

import { authorize, authenticate } from '../middleware/auth.js';

import { createVehicle, deleteVehicle, getVehicle, listVehicles, updateVehicle } from '../controllers/vehicleController.js';

const router = Router();

router.get('/', authenticate, listVehicles);

router.get('/:id', authenticate, getVehicle);

router.post('/', authenticate, authorize('Manager','Boss'), createVehicle);

router.put('/:id', authenticate, authorize('Manager','Boss'), updateVehicle);

router.delete('/:id', authenticate, authorize('Manager','Boss'), deleteVehicle);

export default router;

