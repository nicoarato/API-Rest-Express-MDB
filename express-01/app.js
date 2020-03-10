const debug = require('debug')('app:inicio');
//const dbDebug = require('debug')('app:db');
const express = require('express');
const config = require('config');
//const logger = require('./logger');
const morgan = require('morgan');
const app = express();


const usuarios = require('./routes/usuarios');


//Middlewares
app.use(express.json()); //middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api/usuarios', usuarios);



//Configuracion de entornos
console.log('Aplicacion: ' + config.get('nombre'));
console.log('Base de datos server: ' + config.get('configDB.host'));


//Uso de middleware de 3ros
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    //console.log('Morgan habilitado.');
    debug('Morgan habilitado');
}

//trabajos con la bbdd
debug('Conectando con la bdatos');


app.use(function(req, res, next) {
    console.log('Autenticando...');
    next();
});


app.get('/', (req, res) => {
    res.send('Hola mundo desde Express.');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}...`);
});