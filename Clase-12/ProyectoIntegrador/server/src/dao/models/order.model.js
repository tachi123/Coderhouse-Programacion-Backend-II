import mongoose from 'mongoose';

const collection = 'order';
const schema = new mongoose.Schema({
    number: Number, //Número de orden
    business: {//Negocio
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'business'
    }, 
    user: {//Usuario que realiza la orden
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    },
    products: [],
    totalPrice: Number,
    status: String //Campo que nos sirve para cancelar o completar una orden
})

const orderModel = mongoose.model(collection, schema);
export default orderModel;