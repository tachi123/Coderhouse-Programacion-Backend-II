import { Router } from 'express';
import { enviarSMS } from '../controllers/sms.controller.js';

const router = Router();

router.get('/send', enviarSMS);

export default router;