import { User } from "../models/User.js";

const getAllUsers = ((req, res) => {
    const allUsers = await User.findAll();
    res.json(allUsers);
});

const getUserById = ((req, res) => {
    const { id } = req.params;

});
//crear gets para buscar usuario
const createUser = ((req, res) => {

}); 
//crear post para crearlos
//put para mofificarlos

//delete para eliminarlo