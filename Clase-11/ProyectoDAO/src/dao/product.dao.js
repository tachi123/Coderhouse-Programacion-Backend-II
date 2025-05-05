/**
 * ABSTRACCIÓN DE LA LÓGICA DE ACCESO A DATOS EN MEMORIA
 * GET - UPDATE - DELETE - INSERT
 */
export default class ProductDao {

    constructor(){
        this.data = [];
    }

    get = async () => {
        return this.data;
    }

}