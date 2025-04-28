import { Router } from 'express';
import * as jugueteController from '../controllers/juguete.controller.js';

const router = Router();

router.get('/', jugueteController.obtenerJuguetes)
router.post('/', jugueteController.crearJuguetes);

export default router;