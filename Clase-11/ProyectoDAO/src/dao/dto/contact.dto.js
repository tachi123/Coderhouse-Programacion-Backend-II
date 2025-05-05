/**
 * DTO - Data Transfer Object
 * Tienen como propósito transformar los datos de contactos recibidos del frontend al formato que espera el DAO
 * o al revés, transformar los datos antes de enviarle al usuario
 * NO ES OBLIGATORIO ambos sentidos
 */
export default class ContactDTO{

    constructor(contact){
        this.first_name = contact.name;
        this.last_name = contact.last_name;
        this.fullname = contact.last_name + ', ' + contact.name;
        //En los DTOs podemos setear nuevas propiedades o propiedades por default
        this.active = true;
        //Capaz el usuario envío el número de teléfono con guiones
        this.phone = contact.phone ? contact.phone.split("-").join("") : "";
    }
}