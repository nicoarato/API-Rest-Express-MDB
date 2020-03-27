const usuarios = require('./routes/usuarios');
const cursos = require('./routes/cursos');
const auth = require('./routes/auth');
const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

mongoose.connect(config.get('configDB.HOST'), { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => { console.log('No se pudo conectar...'), err });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* app.use('/api', usuarios); */
app.use('/api/usuarios', usuarios);
app.use('/api/cursos', cursos);
app.use('/api/auth', auth);


//app.use('/api/cursos', cursos);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('API Rest ok... ejecutandose...')

});