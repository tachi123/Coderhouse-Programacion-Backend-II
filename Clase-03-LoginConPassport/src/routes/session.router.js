import {Router} from 'express';
import User from '../models/user.model.js';
import { createHash, isValidPassword } from '../utils.js';

const router = Router();

//Registración
router.post('/register', passport.authenticate('register', {failureRedirect: '/failregister'}) ,async (req, res) => {
    try{
        console.log('User registered');
        res.redirect('/login');
    }catch (error){
        console.log(`Error al registrar el usuario: ${error}`);
        res.status(500).send("Error al registrar el usuario");
    }
})

router.get('/failregister', (req,res) => {
    res.send({error: "Failed"})
})

//Iniciar sesión
router.post('/login', passport.authenticate('login', {failureRedirect: '/faillogin'}) ,async (req, res) =>{
    try{
        if(!req.user){//Lego acá, es que el middle lo supero
            return res.status(401).send({status: 'error', error: 'Invalid credentials'})
        }

        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age
        }

        res.redirect('/perfil');
    }catch (error){
        console.log(`Error al iniciar sesión`);
        res.status(500).send("Error al iniciar sesión");
    }
})

router.get('/faillogin', (req,res) => {
    res.send({error: "Failed"})
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
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({status: false,message: "Email y nueva contraseña son requeridos",});
    }
    try{
        const user = await User.findOne({email: email});
        if (!user) {
            return res.status(404).send({ status: false, message: "Usuario no encontrado" });
        }
        user.password = createHash(password);
        await user.save();
        res.redirect('/login');
    }catch(error){
        return res.status(500).send("Error al restaurar la contraseña");
    }
});

export default router;