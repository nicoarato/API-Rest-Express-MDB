const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/demo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a mongoDB'))
    .catch(err => console.log('No se pudo conectar con mongodb', err));