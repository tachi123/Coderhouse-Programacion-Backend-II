import * as jugueteDAO from '../models/juguete.model.mem.js';


export const obtenerJuguetes = async () => {
    return await jugueteDAO.obtenerJuguetes;
}

export const crearJuguetes = async (juguete) => {
    return await jugueteDAO.crearJuguete(juguete);
}