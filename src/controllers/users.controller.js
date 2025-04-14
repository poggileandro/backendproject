import { usersService } from "../services/index.js"
import { createHash } from "../utils/index.js";
import { faker } from '@faker-js/faker'


const getAllUsers = async(req,res)=>{
    const users = await usersService.getAll();
    res.send({status:"success",payload:users})
}

const getAllUser = async(req,res)=>{
    const users = await usersService.getAll();
    return users;
}



const getUser = async(req,res)=> {
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if(!user) return res.status(404).send({status:"error",error:"User not found"})
    res.send({status:"success",payload:user})
}

const createUsers = async (cant) => {
    const userPromises = [];
    for (let i = 0; i < cant; i++) {
        const user = {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: await createHash("coder123"),
            role: faker.helpers.arrayElement(["admin", "user"]),
            pets: []
        };

        userPromises.push(usersService.createUser(user));
    }

    const createdUsers = await Promise.all(userPromises);
    return createdUsers;
};

const updateUser =async(req,res)=>{
    const updateBody = req.body;
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if(!user) return res.status(404).send({status:"error", error:"User not found"})
    const result = await usersService.update(userId,updateBody);
    res.send({status:"success",message:"User updated"})
}

const deleteUser = async(req,res) =>{
    const userId = req.params.uid;
    const result = await usersService.getUserById(userId);
    res.send({status:"success",message:"User deleted"})
}

export default {
    deleteUser,
    getAllUsers,
    getUser,
    updateUser,
    createUsers,
    getAllUser
}