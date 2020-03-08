const express = require('express');
const app = express();

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

    let usuario = usuarios.find(u => u.id === parseInt(req.params.id))

    if (!usuario) {
        res.status(404).send('El usuario no fue encontrado.');
    } else {
        res.send(usuario)
    }
});




const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}...`);
});







/* app.post();
app.put();
app.delete(); */