import mongoose from 'mongoose';

const collection = 'business';
const schema = new mongoose.Schema({
    name: String,
    products: []
})

const businessModel = mongoose.model(collection, schema);
export default businessModel;