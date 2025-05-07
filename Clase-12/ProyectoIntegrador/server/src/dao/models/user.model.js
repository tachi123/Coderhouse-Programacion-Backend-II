import mongoose from 'mongoose';

const collection = 'user';
const schema = new mongoose.Schema({
    name: String,
    email: String,
    role: String,
    orders: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'order'
        }
    ]
})

const userModel = mongoose.model(collection, schema);
export default userModel;