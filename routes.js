const express = require('express');
const route =  express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');

const { isLogged } = require('./src/middlewares/middleware.js');

//rotas da home
route.get( '/', isLogged, homeController.index);

//rotas de login
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

//rotas para contato
route.get('/contato/index', isLogged, contatoController.index);
route.get('/contato/index/:id', isLogged, contatoController.editIndex);
route.get('/contato/delete/:id', isLogged, contatoController.delete);
route.post('/contato/cadastrar', isLogged, contatoController.cadastro);
route.post('/contato/edit/:id', isLogged, contatoController.edit);

module.exports = route;