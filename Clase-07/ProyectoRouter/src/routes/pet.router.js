import { Router } from 'express';

const router = Router();

const petRegex = /^[a-zA-ZñÑ]+$/;

const pets = [] ; //Persistencia de las mascotas en memoria

router.param('pet', (req, res, next, petName) => {
    //Lógica para la búsqueda de la mascota
    if(petRegex.test(petName)) return res.status(400).send("Nombre no válido para la mascota");
    const pet = pets.find( unaMascota => unaMascota.name === petName);
    if(pet){
        req.pet = pet;
        next();
    }else{
        res.status(404).send("Mascota no encontrada");
    }
})

//POST /api/pet -- Crear una mascota {name, specie}
router.post('/', (req,res) => {
    const {name, specie} = req.body;
    if(!name || !specie) return res.status(400).send("Nombre y especie son obligatorios");
    if(petRegex.test(name)) return res.status(400).send("Nombre no válido para la mascota");
    const newPet = {name, specie};
    pets.push(newPet);
    res.status(201).send(newPet);
})

//GET /api/pet/:pet - Obtener una mascota por nombre (solo letras y espacio)
router.get('/:pet', (req, res) => {
    res.send(req.pet);
});

//PUT /api/pet/:pet - Actualizar el estado de adopción de la mascota
router.put('/:pet', (req, res) => {
    req.pet.adopted = true;
    res.send(req.pet);
});


export default router;