import ProductDao from '../dao/product.dao.js';

export default class ProductRepository{

    constructor(){
        this.dao = new ProductDao();
    }

    //Abstraer los métodos para acceder DAO
    getProducts = async () => {
        let result = await this.dao.get();
        return result;
    }

}