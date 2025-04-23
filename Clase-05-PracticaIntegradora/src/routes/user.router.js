import { Router } from "express";
import userService from "../models/user.model.js";
import { isValidPassword } from "../utils.js";
import { generateToken } from "../utils.js";

const router = Router();

router.post("/register", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({
      message: "Todos los campos son requeridos",
    });
  }
  try {
    const newUser = new userService({
      first_name,
      last_name,
      email,
      password,
    });
    await newUser.save();
    res.status(201).send({
      status: true,
      message: "Usuario registrado exitosamente",
    });
    res.redirect("/user/current");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Todos los campos son requeridos",
      });
    }
    const user = await userService.findOne({ email });
    if (!user) {
      return res.status(401).send("Usuario no encontrado");
    }
    if (!isValidPassword(user, password)) {
      return res.status(403).send("Contraseña incorrecta");
    }
    const jwt_token = generateToken({
      userId: user._id,
      role: user.role,
      first_name: user.first_name,
      last_name: user.last_name,
    });
    res.cookie("currentUser", jwt_token, { httpOnly: true });
    res.redirect("/user/current");
  } catch (error) {
    console.log(`Error al iniciar sesión ${error}`);
    res.status(400).send("Error al iniciar sesión");
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("currentUser", { httpOnly: true });
  res.redirect("/user/login");
});

export default router;
