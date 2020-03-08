const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hola mundo desde Express.');
});

app.get('/api/usuarios', (req, res) => {
    res.send(['Luis', 'Maria', 'Franco']);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}...`);
});







/* app.post();
app.put();
app.delete(); */