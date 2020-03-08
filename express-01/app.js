const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hola mundo desde Express.');
});

app.get('/api/usuarios', (req, res) => {
    res.send(['Luis', 'Maria', 'Franco']);
});

app.listen(3000, () => {
    console.log('Escuchando en el puerto 3000...');
});





/* app.post();
app.put();
app.delete(); */