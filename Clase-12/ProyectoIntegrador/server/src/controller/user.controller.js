

export const getUsers = async (req, res) => {
    
    res.send({status: "success", result: "getUsers"})
}

export const saveUser = async (req, res) => {
    res.send({status: "success", result: "saveUser"})
}

export const getUserById = async (req, res) => {
    res.send({status: "success", result: "getUserById"})
}