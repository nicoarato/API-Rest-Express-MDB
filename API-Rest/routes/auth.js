const express = require('express');
const jwt = require('jsonwebtoken');
const ruta = express.Router();
const Usuario = require('../models/usuario_model');
const bcrypt = require('bcrypt');


ruta.post('/', (req, res) => {
    Usuario.findOne({ email: req.body.email })
        .then(datos => {
            if (datos) {
                const passValido = bcrypt.compareSync(req.body.password, datos.password);
                if (!passValido) {
                    return res.status(400).json({
                        error: 'ok',
                        msj: 'Usuario o contraseña incorrecta.'
                    })
                }
                const jwToken = jwt.sign({
                    data: { _id: datos.id, nombre: datos.nombre, email: datos.email }
                }, 'secret', { expiresIn: '24h' });
                res.json({
                        usuario: {
                            _id: datos._id,
                            nombre: datos.nombre,
                            email: datos.email
                        },
                        token: jwToken
                    })
                    //jwt.sign({ _id: datos.id, nombre: datos.nombre, email: datos.email }, 'password');
                    //res.send(jwToken);

            } else {
                res.status.json({
                    error: 'ok',
                    msj: 'Usuario o contraseña incorrecta.'
                })
            }
        })
        .catch(err => {
            res.status(400).json({
                erro: 'Error en el servicio. ' + err
            })
        })
})


module.exports = ruta;