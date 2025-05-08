import { Router } from 'express';
import { getBusiness, getBusinessById, createBusiness, addProduct } from '../controller/business.controller.js';

const router = Router();

router.get('/', getBusiness);
router.get('/:bid', getBusinessById);

router.post('/', createBusiness);
router.post('/:bid', addProduct);

export default router;