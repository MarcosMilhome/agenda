import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Login from './modules/Login'
import Contato from './modules/Contato'

const cadastro = new Login('.form-register');
const login = new Login('.form-login');
const contato = new Contato('.form-contato');

cadastro.init();
login.init();
contato.init();