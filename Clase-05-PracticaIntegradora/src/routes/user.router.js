import { Router } from 'express';
import UserService from '../models/user.model.js';
import { isValidPassword, generateToken } from '../utils.js';

const router = Router();

//Registro de usuario
router.post('/register', async (req,res) => {
    try{
        //const newUser = new UserService(req.body); //Crear un usuario a partir de los datos del formulario de registración
        const { first_name, last_name, email, password } = req.body
        if (!first_name || !last_name || !email || !password) {
            return res.status(400).json({
                message: "Todos los campos son requeridos"
            })
        }
        const newUser = new UserService({first_name, last_name, email, password})
        await newUser.save(); //Guardamos el usuario en la base de datos
        res.status(201).json({message: 'Usuario registrado exitosamente'});
    }catch(error){
        res.status(400).json({error: error.message}); //Manejamos errores durante el proceso de registración
    }
})

//Login 
router.post('/login', async (req,res) => {
    try{
        const {email, password} = req.body; //Obtener los datos del body usando desestructuring/Desestructuración
        if (!email || !password) {
            return res.status(400).json({
                message: "Usuario y contraseña deben ser ingresados"
            })
        }
        /**
         * Para validar la contraseña: 
         * - Buscar el usuario por mail en la base de datos
         * - Comparar las contraseñas: la ingresada por el usuario en texto plano y la contraseña hasheada guardada
         */
        const user = await UserService.findOne({ email});
        if(!user) return res.status(400).json({error: "Usuario no encontrado"}); //Error buscando usuario por mail - el usuario no existe
        
        if(!isValidPassword(user, password)){//Validar la contraseña, y si falla, retornar un error
            return res.status(400).json({error: "Credenciales inválidas"});
        }
        //Generar un token y almacenarlo en una cookie
        //const jwt_token = generateToken({ user: user}); //Se encripta toda la información del usuario en el JWT
        const jwt_token = generateToken({ userId: user._id, role: user.role, name: user.first_name});
        res.cookie('currentUser', jwt_token, {httpOnly: true}); //Almacenamos el token en una cookie HTTP-Only
        
        res.json({message: 'Inicio de sesión exitoso'});
    }catch(error){
        res.status(500).json({error: error.message}); //Manejamos errores durante el proceso de login
    }
})

export default router;