import ContactModel from './models/contact.model.js';

/**
 * ABSTRACCIÓN DE LA LÓGICA DE ACCESO A DATOS
 * GET - UPDATE - DELETE - INSERT
 */
export default class Contacts {

    constructor(){}

    /**
     * Sabemos que FIND corresponde a Mongo, pero utilizamos el método llamado GET para lograr una abstracción de la fuente de datos
     */
    get = async () => {
        let contacts = await ContactModel.find();
        return contacts;
    }

    insert = async (contact) => {
        const newContact = await ContactModel.create(contact);
        return newContact;
    }
    
    update = async (id, contact) => {
        const contactUpdated = await ContactModel.findByIdAndUpdate(id, contact, {new: true});
        return contactUpdated;
    }
    
    delete = async (id) => {
        await contacts.findByIdAndDelete(id);
    }

}