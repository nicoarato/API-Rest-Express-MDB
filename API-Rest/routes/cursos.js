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

ruta.put('/:id', (req, res) => {
    let resultado = actualizarCurso(req.params.id, req.body);

    resultado.then(curso => {
        res.json({
            curso: curso
        }).catch(err => {
            res.status(400).json({
                error: err
            })
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

async function actualizarCurso(id, body) {
    let curso = await Curso.findByIdAndUpdate(id, {
        $set: {
            titulo: body.titulo,
            descripcion: body.descripcion
        }
    }, { new: true });
    return curso;
}


module.exports = ruta;