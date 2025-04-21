import { Router } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();


//Login enviado JWT en cookie
router.post('/login', (req, res) => {
    const {email, password} = req.body;
    //En una plicación real, se usa la base de datos o un servicio de autenticación de terceros
    if(email === 'coder@coder.com' && password === 'coderpass'){
        //Firmar el token y es importante cambiar la clave por una clave segura
        const token = jwt.sign({email, role: "user"}, 'coderSecret', {expiresIn: '1h'});
        //Sin HTTP only para la primera parte del ejercicio
        res.cookie('tokenCookie',token, {httpOnly: true, maxAge: 3600000}).send({message: 'Logged in!'});
    }else{
        res.status(401).send({message: 'Credenciales inválidas'});
    }
})

//Login enviando JWT en la respuesta
//No es recomendable porque tiene riesgo a un XSS Cross-Site Scripting
router.post('/loginLocalStorage', (req, res) => {
    const {email, password} = req.body;
    if(email === 'coder@coder.com' && password === 'coderpass'){
        const token = jwt.sign({email, role: "user"}, 'coderSecret', {expiresIn: '1h'});
        res.send({message: 'Logged in!', token: token});
    }else{
        res.status(401).send({message: 'Credenciales inválidas'});
    }
})

export default router;