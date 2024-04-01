const UserService = require("../services/UserService");

async function createUser(req, res){
    try {
        const User = await UserService.create(req, res);
        res.status(200).json(User);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
} 

async function updateUser(req, res){
    try {
        const User = await UserService.update(req, res);
        res.status(200).json(User);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function signIn (req, res) {
    try {
        const User = await UserService.login(req, res);
        res.status(200).json(User);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function userProfile (req, res) {
    try {
        const User = await UserService.profile(req, res);
        res.status(200).json(User);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function getAllUsers (req, res) {
    try {
        const User = await UserService.getusers(req, res);
        res.status(200).json(User);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = { 
    createUser, 
    updateUser,
    signIn,
    userProfile,
    getAllUsers 
}