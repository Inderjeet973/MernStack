const express = require('express')
const routes = express.Router();
const UserController= require('../controllers/userController')
routes.put('/',UserController.register);
routes.get('/login',UserController.login);

module.exports = routes;