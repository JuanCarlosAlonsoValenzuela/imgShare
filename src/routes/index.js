// req = request
// res = response

// Importamos express
const express = require('express');

// Creamos la constante router
const router = express.router();

// Importamos los controladores
const home = require('../controllers/home');
const image = require('../controllers/image');

// Para evitar la repetición de código en el enrutamiento, nos ayudamos de controladores

module.exports = app => {
    router.get('/', home.index);
    router.get('/images/:image_id', image.index);
    
    //
    router.post('/images', image.create);
    router.post('/images/:image_id/like', image.like);
    router.post('/images/:image_id/comment', image.comment);

    //
    router.delete('/images/:image_id', image.remove);

    app.use(router);

};

