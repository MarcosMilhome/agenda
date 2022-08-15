// Referente as variaveis de ambiente que estão localizadas no arquivo .env
// relacionados ao ambiente de desenvolvimento
require('dotenv').config();

const express = require('express');
const app = express();

const mongoose = require('mongoose'); // o Mongoose vai modelar a base de dados! E garantir que ela esteja do jeito que você quiser
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(()=> {
        app.emit('pronto');
    }).catch( e => console.log(e));


const session = require('express-session'); // Identificar o navegador de um cliente. Salvando um cookie com algum ID
const MongoStore = require('connect-mongo'); //Garantir que as sessões vão ser salvas na base de dados
const flash = require('connect-flash'); //Mensagens auto-destrutivas! Assim que executada, vão ser excluidas da base de dados!

const routes = require('./routes'); // rotas da aplicação, ex: /home, /contato
const path = require('path'); // trabalhar com caminhos.

const helmet = require('helmet'); // recomendação do próprio express
const csrf = require('csurf'); // csrf tokens que são criados para cada formulario da nossa aplicação / Segurança

// Middlawares são funções que são executadas na rota!

const { checkCsrfError, csrfMiddleware, middlewareGlobal, isLogged } = require('./src/middlewares/middleware');


app.use(helmet());
app.use(express.json());
app.use( express.urlencoded( { extended: true } ) );

//todos os arquivos que são estaticos e que podem ser acessados diretamente
app.use( express.static(path.resolve(__dirname, 'public')));

//Configuração do MongoDB
const store = new MongoStore({
    mongoUrl: process.env.CONNECTIONSTRING,
    secret: 'asdfjadsfih12311sdaa',
    touchAfter: 24*60*60,
});

//configuração de sessões
const sessionOptions = session({
    secret: 'asdfjadsfih12311sdaa',
    // store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*60*60*24*7,
        httpOnly: true
    },
    store: store
});

app.use(sessionOptions);
app.use(flash());

// views são os arquivos que são renderizados na tela
app.set('views', path.resolve(__dirname, 'src', 'views'));
// view engine é a engine que é utilizada 
app.set('view engine', 'ejs');

app.use(csrf());

//nossos proprios middlewares
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);

app.on('pronto', ()=>{
    app.listen(3000, ()=>{
        console.log('Acessar http://localhost:3000');
        console.log('Servidor executando na porta 3000');
    });
});

