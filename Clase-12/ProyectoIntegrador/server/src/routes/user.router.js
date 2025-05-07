import { Router } from 'express';
import { getUsers, saveUser, getUserById } from '../controller/user.controller.js';

const router = Router();

router.get('/', getUsers);
router.get('/:uid', getUserById);
router.post('/', saveUser);

export default router;