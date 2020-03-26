const express = require('express');
const Curso = require('../models/curso_model');
const ruta = express.Router();

ruta.get('/', (req, res) => {

    res.json('Listo el Get de cursos.');
});

ruta.post('/', (req, res) => {
    let resultado = crearCurso(req.body);

    resultado.then(curso => {
        res.json({
            curso: curso
        })
    }).catch(err => {
        res.status(400).json({
            error: err
        })
    })
})


async function crearCurso(body) {

    let curso = new Curso({
        titulo: body.titulo,
        descripcion: body.descripcion

    });
    return await curso.save();

}


module.exports = ruta;