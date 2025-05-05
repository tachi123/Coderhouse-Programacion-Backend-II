import { Router } from 'express';

import { productService } from '../repository/index.js';

const router = Router();

//Obtener todos los recursos
router.get('/', async (req, res) => {
    const result = await productService.getProducts();
    res.send({status: "success", payload: result})
})


export default router;