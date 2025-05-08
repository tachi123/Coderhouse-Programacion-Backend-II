import UserRepository from '../repositories/user.repository.js';

const userService = new UserRepository();

export const getUsers = async (req, res) => {
    let result = await userService.getUsers();
    res.send({status: "success", result})
}

export const saveUser = async (req, res) => {
    const user = req.body; //No es necesario hacer las validaciones acá, las hago usando DTO
    let result = await userService.saveUser(user);
    res.send({status: "success", result})
}

export const getUserById = async (req, res) => {
    const {uid} = req.params.uid;
    let result = await userService.getUserById(req.params.uid);
    res.send({status: "success", result})
}