let users = []; //Array simulando una base de datos

export const getUsers = (req,res) => {
    return users;
}

export const createUser = async (user) => {
    const newUser = { ...user, id: users.length + 1 };
    users.push(newUser);
    return newUser;
}