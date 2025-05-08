import Business from "../dao/business.dao.js";

const businessService = new Business();

export const getBusiness = async (req, res) => {
    let result = await businessService.getBusiness();
    res.send({status: "success", result})
}

export const getBusinessById = async (req, res) => {
    const bid = req.params.bid;
    let result = await businessService.getBusinessById(bid);
    res.send({status: "success", result})
}

export const createBusiness = async (req, res) => {
    const business = req.body; //Las validaciones las dejamos para después
    let result = await businessService.createBusiness(business);
    if(!result) return res.status(500).send({status: "error", error: "Something went wrong, try again later"});
    res.send({status: "success", result: "createBusiness"})
}

export const addProduct = async (req, res) => {
    const bid = req.params.bid;
    const product = req.body;

    //Busco el negocio
    const business = await businessService.getBusinessById(bid);
    //Agrego un producto al array de productos
    business.products.push(product);
    //Reflejo los cambios en la base de datos
    const result = await businessService.updateBusiness(business._id, business);

    res.send({status: "success", result})
}