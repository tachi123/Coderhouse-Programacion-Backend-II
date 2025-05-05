/**
 * ABSTRACCIÓN DE LA LÓGICA DE ACCESO A DATOS EN MEMORIA
 * GET - UPDATE - DELETE - INSERT
 */
export default class Contacts {

    constructor(){
        this.data = [];
    }

    get = async () => {
        return this.data;
    }

    insert = async (contact) => {
        this.data.push(contact);
        return contact;
    }
    
    update = async (id, contact) => {
        const index = this.data.findIndex( elem => elem.id === id);
        if(index === -1) return null;
        this.data[index] = { ...this.data[index], ...contact };
        return this.data[index];
    }
    
    delete = async (id) => {
        const index = this.data.findIndex( elem => elem.id === id);
        if(index === -1) return null;
        this.data.splice(index,1);
    }

}