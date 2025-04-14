import { faker } from '@faker-js/faker'
import { createHash } from '../utils/index.js';
import usersController from './users.controller.js';
import petsController from './pets.controller.js';



const getUsers = async (req,res) =>{
try {
     const {cant} = req.body
     const users = [];
     for (let i = 0; i < cant; i++) {
        users.push({
            nombre: faker.person.firstName(),
            password:  await createHash("coder123"),
            role: faker.helpers.arrayElement(["admin", "user"]),
            pets: []
        })
     }
     res.send({status:"success",payload:users})
} catch (error) {
    res.send({status:"error",payload:error})   
}
}

const createData = async (req, res) => {
    try {
        const { users,pets } = req.body;
        const createdPets = await petsController.createPets(pets);
        const createdUsers = await usersController.createUsers(users);
        res.status(201).json({
            message: "Usuarios y mascotas creados exitosamente",
            data: {
                users: createdUsers,
                pets: createdPets
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear usuarios o mascota" });
    }
}

const getData =  async(req,res) =>{
 const pets =  await petsController.getAllPet();
 const users = await usersController.getAllUser();
 res.status(201).json({
    message: "Usuarios y mascotas en base de datos",
    data: {
        users: users,
        pets: pets
    }
});

}


export default{
    getUsers,
    createData,
    getData
}