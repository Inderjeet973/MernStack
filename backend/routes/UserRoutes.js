const express = require('express')
const authMiddleware = require('../middleware/authmiddleware')
const routes = express.Router();
const UserController= require('../controllers/userController')
routes.put('/',UserController.register);
routes.post('/login',UserController.login);
routes.post('/google-login',UserController.googleLogin);
routes.post('/update',authMiddleware,UserController.update);
module.exports = routes;