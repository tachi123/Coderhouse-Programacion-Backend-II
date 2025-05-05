import { Router } from 'express';
//import Contacts from '../dao/mongo/contact.mongo.js'; //Importamos el DAO de MongoDB
//import Contacts from '../dao/memory/contact.memory.js'; 
//import contactService from '../dao/factory.js';

import { contactService } from '../repository/index.js';

const router = Router();

//Obtener todos los recursos
router.get('/', async (req, res) => {
    const result = await contactService.getContacts();
    res.send({status: "success", payload: result})
})

//Crear o insertar un recurso
router.post('/', async (req, res) => {
    const result = await contactService.createContact(contact);
    res.send({status: "success", payload: result})
})

//Actualizar un recurso
router.put('/:id', async (req, res) => {
    const result = await contactService.updateContact(req.params.id, req.body);
    res.send({status: "success", payload: result})
})

//Borrar un recurso
router.delete('/:id', async (req, res) => {
    const result = await contactService.deleteContact(req.params.id);
    res.send({status: "success", payload: result})
})

export default router;