let juguetes = []; //Array simulando una base de datos

export const obtenerJuguete = (req,res ) => {
    return juguetes;
}

export const crearJuguete = async (juguete) => {
    const nuevoJuguete = { ...juguete, id: juguetes.length + 1 };
    juguetes.push(nuevoJuguete);
    return nuevoJuguete;
}