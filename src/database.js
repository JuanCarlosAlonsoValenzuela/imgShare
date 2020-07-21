// Este archivo realiza la conexión con la base de datos

// Importamos el módulo
const mongoose = require('mongoose');

// Accedemos solamente a database
const { database } = require('./keys');
const e = require('express');

// Llamamos al método connect, que necesita una dirección de mongoDB
// Dicha dirección se encuentra en el archivo keys.js

// Esta línea sería suficiente para conectarnos con la base de datos
//mongoose.connect(database.URI);


// Sin embargo, añadimos una promesa para comprobar que la conexión se ha realizado correctamente
mongoose.connect(database.URI, {
    useNewUrlParser: true
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));

