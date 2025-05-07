import userModel from "./models/user.model.js";

export default class User{

    getUsers = async () => {
        try{
            let users = await userModel.find();
            return users;
        }catch(error){
            console.log(error);
            return null;
        }
    }

    getUserById = async (id) => {
        try{
            let user = await userModel.findOne({_id: id});
            return user;
        }catch(error){
            console.log(error);
            return null;
        }
    }

    saveUser = async (user) => {
        try{
            let userCreated = await userModel.create(user);
            return userCreated;
        }catch(error){
            console.log(error);
            return null;
        }
    }
    
    updateUser = async (id, user) => {
        try{
            let userUpdated = await userModel.updateOne({_id:id},{$set:user});
            return userUpdated;
        }catch(error){
            console.log(error);
            return null;
        }
    }
}