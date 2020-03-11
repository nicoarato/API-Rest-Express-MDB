const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/demo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a mongoDB'))
    .catch(err => console.log('No se pudo conectar con mongodb', err));

const cursoSchema = new mongoose.Schema({
    nombre: String,
    autor: String,
    etiquetas: [String],
    fecha: { type: Date, default: Date.now },
    publicado: Boolean
});

//Clase -> objetos
//Persona -> jose
//Schema -> modelo

const Curso = mongoose.model('Curso', cursoSchema);

async function crearCurso() {

    const curso = new Curso({
        nombre: 'Angular',
        autor: 'Lucía',
        etiquetas: ['Desarrollo web', 'Front end'],
        publicado: true
    });

    const resultado = await curso.save();
    console.log(resultado);
}

//crearCurso();

/**
 * Operadores de comparacion
 * eq (equal) 
 * ne (not equal)
 * gt (greater)
 * gte (greater than or equal to)
 * lt (less than)
 * lte
 * in
 * nin (not in)
 * 
 * 
 */

async function listarCursos() {

    const cursos = await Curso
        //.find({ publicado: true })

    //.find({ precio: {$gte:10, $lte:30} })
    //.find({ precio: {$in: [10, 15, 25]} })

    //.find()
    //.or([{ autor: 'Lucía' }, { publicado: false }])
    //.and([{ autor: 'Lucía' }, { publicado: false }])

    //.find({ autor: /^L/ })  //comienza con un patron

    //.find({ autor: /a$/ }) //termina con patron

        .find({ autor: /.*at.*/ }) //contiene un patron
        .limit(10)
        .sort({ autor: -1 })
        .select({ autor: 1, nombre: 1, etiquetas: 1 });


    console.log(cursos);
}

listarCursos();