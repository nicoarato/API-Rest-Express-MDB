const express = require('express');
const Curso = require('../models/curso_model');
const ruta = express.Router();
const verificarToken = require('../middlewares/auth');

ruta.get('/', verificarToken, (req, res) => {

    res.json({
        usuario: req.usuario
    })


    let resultado = listarCursosActivos();
    resultado.then(cursos => { res.json(cursos); })
        .catch(err => { res.status(400).json(err) });

})


ruta.post('/', verificarToken, (req, res) => {
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

ruta.put('/:id', verificarToken, (req, res) => {
    let resultado = actualizarCurso(req.params.id, req.body);

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


ruta.delete('/:id', verificarToken, (req, res) => {
    let resultado = desactivarCurso(req.params.id);
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

async function listarCursosActivos() {
    let cursos = await Curso.find({ "estado": true });
    return cursos;
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

async function desactivarCurso(id) {

    let curso = await Curso.findByIdAndUpdate(id, {
        $set: {
            estado: false
        }
    }, { new: true });
    return curso;
}


module.exports = ruta;