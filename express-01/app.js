const express = require('express');
const logger = require('./logger');
const app = express();
const Joi = require('@hapi/joi');

app.use(express.json()); //middleware

app.use(express.urlencoded({ extended: true }));

app.use(logger);

app.use(function(req, res, next) {
    console.log('Autenticando...');
    next();
});



const usuarios = [
    { id: 1, nombre: 'Luis' }, { id: 2, nombre: 'Maria' }, { id: 3, nombre: 'Ana' }
];

app.get('/', (req, res) => {
    res.send('Hola mundo desde Express.');
});

app.get('/api/usuarios', (req, res) => {
    res.send(usuarios);
});

app.get('/api/usuarios/:id', (req, res) => {

    let usuario = existeUsuario(req.params.id);

    if (!usuario) {
        res.status(404).send('El usuario no fue encontrado.');
    } else {
        res.send(usuario)
    }
});


app.post('/api/usuarios', (req, res) => {


    const schema = Joi.object({
        nombre: Joi.string()
            .min(3)
            .required()
    });

    const { error, value } = validarUsuario(req.body.nombre);

    if (!error) {
        const usuario = {
            id: usuarios.length + 1,
            nombre: value.nombre
        };

        usuarios.push(usuario);
        res.send(usuario);
    } else {
        const mensaje = error.details[0].message;
        res.status(400).send(mensaje);
    }
});


app.put('/api/usuarios/:id', (req, res) => {

    //encontrar si existe el usuario.

    let usuario = existeUsuario(req.params.id);
    if (!usuario) {
        res.status(404).send('El usuario no fue encontrado.');
        return;
    }


    const { error, value } = validarUsuario(req.body.nombre);

    if (error) {
        const mensaje = error.details[0].message;
        res.status(400).send(mensaje);
        return;
    }

    usuario.nombre = value.nombre;
    res.send(usuario);

});

app.delete('/api/usuarios/:id', (req, res) => {
    //encontrar si existe el usuario.

    let usuario = existeUsuario(req.params.id);
    if (!usuario) {
        res.status(404).send('El usuario no fue encontrado.');
        return;
    }

    const index = usuarios.indexOf(usuario);
    usuarios.splice(index, 1);
    res.send(usuarios);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}...`);
});


function existeUsuario(id) {
    return usuarios.find(u => u.id === parseInt(id));
}

function validarUsuario(name) {
    const schema = Joi.object({
        nombre: Joi.string()
            .min(3)
            .required()
    });

    return schema.validate({ nombre: name });
}


/* app.post();
app.put();
app.delete(); */