import mongoose from "mongoose";

//Definir el esquema para el contacto
const contactSchema = new mongoose.Schema({
    nombre: { type: String, required: true}, 
    email: { type: String, required: true}
})

const ContactModel = mongoose.model("contact", contactSchema);

export default ContactModel;