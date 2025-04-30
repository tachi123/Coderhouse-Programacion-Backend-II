import * as userDAO from "../models/user.model.mem.js";

export const getUsers = async () => {
  return await userDAO.findAll();
};
export const createUser = async (user) => {
  return await userDAO.create(user);
};