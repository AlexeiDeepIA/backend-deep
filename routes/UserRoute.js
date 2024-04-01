const UserController = require('../controller/UserController');
const router = require("express").Router();

router.post('/signup', async (req, res) => {
    UserController.createUser(req, res);
})

router.put('/update/:id', async (req, res) => {
    UserController.updateUser(req, res);
})

router.post('/login', async (req, res) => {
    UserController.signIn(req, res);
})

router.get('/user-profile/:id', async (req, res) => {
    UserController.userProfile(req, res);
})

router.get('/getusers', async (req, res) => {
    UserController.getAllUsers(req, res);
})



module.exports = router;