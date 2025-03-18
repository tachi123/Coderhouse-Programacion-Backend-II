import { Router } from 'express';
import userModel from '../models/user.model.js';
import mongoose from 'mongoose';

const router = Router();

function logConsultas(req, res, next){
    console.log(`/api/user/ - ${req.method}`);
    //Hago un conjunto de tareas y cuando termino tengo que indicarle que pase al siguiente
    next();
}

router.use(logConsultas);

router.get('/test', (req, res) => {
    res.send({message: "Prueba que llega algo"});
})

//Get all 
router.get('/' , async (req,res) => {
    try{
        const result = await userModel.find();
        res.status(200).json({status: 'success', payload: result})
    }catch(error){
        res.status(400).send({status: 'error',message: error.message})
    }
})

//Obtener usuario utilizado el id de la cookei
router.get('/:uid' , async (req,res) => {
    try{
        //Un ejemplo de agarrar el id desde la cookie
        const userId = req.params.uid ?? req.cookies.id;
        const result = await userModel.findById(userId);
        if(!result){
            res.status(400).send({status: 'error',message: "Usuario no encontrado con el id almanacenado en la cookie"})
        }
        res.status(200).json({status: 'success', payload: result})
    }catch(error){
        res.status(400).send({status: 'error',message: error.message})
    }
    
})

//Crear un usuario
router.post('/' , async (req,res) => {
    
    const {name, age, email} = req.body;
    try{
        const result = await userModel.create({name, age, email});
        /** 
            const user = new userModel(name, age, email);
            user.save();
        */
        res.cookie('id', result._id);
        res.status(201).send({status: 'success', payload: result})
    }catch(error){
        res.status(400).send({status: 'error',message: error.message})
    }
})

//Actualizar un usuario
router.put('/:uid', async (req, res) => {
    const uid = req.params.uid;
    const { name, age, email } = req.body;
    try{
        if(!mongoose.Types.ObjectId.isValid(uid)){
            throw new Error('ObjectID es inválido');
        }
        const user = await userModel.findById(uid);
        if(!user) throw new Error('User not found');

        const newUser = {
            name: name ?? user.name,
            age: age ?? user.age,
            email: email ?? user.email
        }

        const updateUser = await userModel.updateOne({_id: uid}, newUser);
        res.send({status: 'success', payload: updateUser})

    }catch(error){
        res.status(400).send({status: 'error',message: error.message})
    }

})

//Eliminar un usuario
router.delete('/:uid', async (req, res) => {
    const uid  = req.params.uid;
    try{
        const userDeleted = await userModel.deleteOne({_id : uid});
        res.send({status: 'success', payload: userDeleted})

    }catch(error){
        res.status(400).send({status: 'error',message: error.message})
    }
})

//Ejemplo de como vaciar una cookie o eliminarla
router.get('/logout' ,(req,res) => {
    res.clearCookie('username'); 
    res.status(200).json({status: 'success', payload: "Sesión cerrada"})
})



export default router;