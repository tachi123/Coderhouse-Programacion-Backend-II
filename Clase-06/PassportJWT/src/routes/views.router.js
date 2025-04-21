import { Router } from 'express';
import { authorization, passportCall } from '../utils.js';

const router = Router();

router.get('/login', (req, res) => 
    res.sendFile(path.join(__dirname, "public", "index.html"))
)

router.get('/current', passportCall('jwt'), authorization("user"), (req,res) =>{
    res.send({status: 'success', payload: req.user});
})

router.get('/admin', passportCall('jwt'), authorization("admin"), (req,res) =>{
    res.send({status: 'success', payload: req.user});
})

export default router;