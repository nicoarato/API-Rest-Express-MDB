const express = require('express');
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
                res.json(datos)
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