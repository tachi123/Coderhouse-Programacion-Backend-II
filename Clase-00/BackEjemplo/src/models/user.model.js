import mongoose from 'mongoose';

const userCollection = "users";

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    age:  { type: String, required: true },
    email: {
        type: String,
        unique: true,
        required: true
    }
})

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;
