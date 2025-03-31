import {Router} from 'express';
import User from '../models/user.model.js';
import { createHash, isValidPassword } from '../utils.js';

const router = Router();

//Registración
router.post('/register', async (req, res) => {
    try{
        const { first_name, last_name, email, age, password} = req.body;

        if(!first_name || !last_name || !email || !age || !password){
            return res.status(400).send({status: false, message: "Todos los campos son requeridos"});
        }

        let newUser = new User({
            first_name,
            last_name,
            email,
            age,
            password: createHash(password)
        })

        await newUser.save();
        res.redirect('/login');
    }catch (error){
        console.log(`Error al registrar el usuario: ${error}`);
        res.status(500).send("Error al registrar el usuario");
    }
})

//Iniciar sesión
router.post('/login', async (req, res) =>{
    try{
        const {email, password} = req.body;
        if(!email || !password){//Verifico que no vengan vacíos
            return res.status(400).send({status: false, message: "Todos los campos son requeridos"});
        }

        //Buscamos el usuario a traves del email, no es necesario buscarlo por contraseña
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).send("Usuario no encontrado");
        }

        if(!isValidPassword(user,password)){
            return res.status(403).send("Contraseña incorrecta")
        }

        req.session.user = user;
        res.redirect('/perfil');
    }catch (error){
        console.log(`Error al iniciar sesión`);
        res.status(500).send("Error al iniciar sesión");
    }
})

//Cerrar sesión del usuario
router.post('/logout', (req, res) => {
    req.session.destroy( (error) => {
        if(error){
            console.error('Error al cerrar sesión');
            res.status(500).send('Error al cerrar sesión');
        } else{
            res.redirect('/login');
        }
    })
})

//Ruta POST para manejar la restauración de contraseña
router.post('/restore-password', async (req, res) => {
    //Crear el body de la función que me permita a mi a partir de un email
    //pisar o restaurar la contraseña

});

export default router;