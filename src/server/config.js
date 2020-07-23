const path = require('path');
const exphbs = require('express-handlebars');

const morgan = require('morgan');
const multer = require('multer');
const express = require('express');
const errorHandler = require('errorhandler');

const routes = require('../routes/index');

module.exports = app => {

    // SETTINGS
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, '../views'));
    app.engine('.hbs', exphbs({         // Express-handlebars configuration
        defaultLayout: 'main',
        partialsDir: path.join(app.get('views'), 'partials'),
        layoutsDir: path.join(app.get('views'), 'layouts'),
        extname: '.hbs',
        helpers: require('./helpers')
    }));
    app.set('view engine', '.hbs');

    // MIDDLEWARES
    // Multer y Morgan son Middlewares

    // Modo de uso de morgan (dev)
    app.use(morgan('dev'));
    // Localización de las imágenes
    // Single image indica que solo puede subirse una imagen por post
    app.use(multer({dest: path.join(__dirname, '../public/upload/temp')}).single('image'));
    app.use(express.urlencoded({extended: false})); //Para recibir formularios desde html
    app.use(express.json());    // Para soportar AJAX (ie. no recargar toda la página con cada like)

    // ROUTES
    routes(app);

    // STATIC FILES
    // Esto permite acceder a la carpeta public desde el navegador
    app.use('/public', express.static(path.join(__dirname, '../public')));

    // ERRORHANDLERS
    // Devuelve las variables de entorno (solo se usa en desarrollo)
    if('development' === app.get('env')){
        app.use(errorHandler);
    }
    return app;
}

