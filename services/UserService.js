const UserModel = require("../models/UserModel");
const Validate = require("../validations/UserValidation");
const jwt = require ("jsonwebtoken");
const bcrypt = require("bcrypt");

async function create (req, res) {
    try {
        const { error } = Validate.user(req.body);
        if(error) return { success: false, message: error.details[0].message }
        
        const userExists = await UserModel.findOne({ email: req.body.email });
        if(userExists) return { message: "This email already has an account" };

        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hashSync(password, 10);
        const User = new UserModel({
            name,
            email,
            password: hashedPassword,
        })
        await User.save();
        if(User){
            return { 
                success: true,
                message: "Register successfull!" 
            };
        }        
    } catch (error) {
        return { 
            success: false,
            message: "Internal Server error!",
            error: error.message
        }
    }
}

async function update (req, res) {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hashSync(password, 10);
        const User = await UserModel.findOneAndUpdate({_id: id}, {
            name,
            email,
            password: hashedPassword
        },{new: true});           
        if(User){
            return { message: "Updated successfully!"};
        }
    } catch (error) {
        return { 
            message: "Internal Server error!",
            error: error.message
        }
    }
}

async function login (req, res) {
    try {
        const userExists = await UserModel.findOne({ email: req.body.email });
    
        if(!userExists) return { 
            success: false,
            message: "User not found! Try again" 
        };

        const validPass = await bcrypt.compareSync(
            req.body.password,
            userExists.password
        );

        if(!validPass) return { 
            success: false,
            message: "Invalid password! Try again" 
        };

        const token = jwt.sign({ email: userExists }, process.env.TOKEN, {
            expiresIn: process.env.EXPIRATION,
        })

        return {
            success: true,
            message: "Welcome: " + userExists.name,
            _id: userExists.id,
            email: userExists.email,
            token,
            expiresIn: process.env.EXPIRATION
        };
    } catch (error) {
        return { 
            message: "Internal server error!", 
            error: error.message
        }
    }
}

async function profile (req, res){
    try {
        const { id } = req.params;
        const User = await UserModel.findOne({_id: id})
        .select({
            name: 1,
            email: 1
        })
        if(User) return User;
    } catch (error) {
        return {
            message: "Internal server error!",
            error: error.message
        }
    }
}

async function getusers (req, res){
    try {
        const User = await UserModel.find();

        if(User){
            return {
                success: true, 
                message: "User's data",
                data: User
            }
        } else {
            return { 
                success: false,
                message: "Can't get users data",                
            }
        }
    } catch (error) {
        return {
            success: false, 
            message: "Internal server error",
            error: error.message
        }
    }
}

module.exports = { create, update, login, profile, getusers };