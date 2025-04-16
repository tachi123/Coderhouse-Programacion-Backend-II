import { Router } from "express";
import { isLoggedIn, isLoggedOut } from "../middleware/auth.js";

const router = Router();

//Endpoint para REGISTER
router.get("/register", isLoggedOut, (req, res) => res.render("register"));

//Endpoint para LOGIN
router.get("/login", isLoggedOut, (req, res) => res.render("login"));

//Endpoint para CURRENT  (usuario actual)
router.get("/current", isLoggedIn, (req, res) =>
  res.render("current", { currentUser: req.user })
);

export default router;
