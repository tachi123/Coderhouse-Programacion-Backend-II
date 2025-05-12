import { Router } from 'express';
import { enviarCorreo } from '../controllers/mail.controller.js';

const router = Router();

router.get('/send', enviarCorreo);

export default router;