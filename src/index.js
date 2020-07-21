const express = require('express');
express();

const config = require('./server/config');

// Cargamos la database
require('./database');

// Inicializando el servidor
const app = config(express());

app.listen(app.get('port'), () =>{
    console.log('Server on port', app.get('port'));
});


