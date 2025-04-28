import * as jugueteService from '../services/juguete.service.js';

export const obtenerJuguetes = async (req,res ) => {
    try{
        const juguetes = await jugueteService.obtenerJuguetes(); //Le estoy pidiendo a la capa servicio los juguetes
        //Transformaciones o modificaciones que querramos sobre los datos 
        res.json(juguetes);
    }catch(error){
        res.status(500).json({error: error.message});
    }
    
}

export const crearJuguetes = async (req,res ) => {
    try{
        const nuevoJuguete = await jugueteService.crearJuguetes(req.body);
        res.status(201).json(nuevoJuguete);
    }catch(error){
        res.status(500).json({error: error.message});
    } 
}