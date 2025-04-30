import { Router } from 'express';
import * as userController from "../controllers/user.controller.js";

const router = Router();

//sumo un middleware a nivel router

router.get("/", userController.getUsers);
router.post("/", userController.createUser);

export default router;