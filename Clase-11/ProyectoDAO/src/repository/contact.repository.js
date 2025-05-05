import ContactDTO from '../dao/dto/contact.dto.js';

export default class ContactRepository{

    constructor(dao){
        //Acá recibimos cualquier DAO a utilizar y después llamos utilizando los métodos DAO
        this.dao = dao;
    }

    //Abstraer los métodos para acceder DAO
    getContacts = async () => {
        let result = await this.dao.get();
        //APLICAMOS DTO si quisieramos
        return result;
    }

    createContact = async (contact) => {
        const contactToInsert = new ContactDTO(contact);
        let result = await this.dao.insert(contactToInsert);
        return result;
    }

    updateContact = async (id, contact) => {
        //APLICAMOS DTO si quisieramos
        const contactUpdated = this.dao(id, contact);
        return contactUpdated;
    }
    
    deleteContact = async (id) => {
        await this.dao.delete(id);
    }

}