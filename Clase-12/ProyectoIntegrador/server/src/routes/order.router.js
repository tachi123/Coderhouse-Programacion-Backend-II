import { Router } from 'express';
import { getOrders, getOrderById, createOrder, resolveOrder } from '../controller/order.controller.js';

const router = Router();

router.get('/', getOrders);
router.get('/:oid', getOrderById);

router.post('/', createOrder);
router.put('/:oid', resolveOrder);


export default router;