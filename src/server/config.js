const path = require('path');
const exphbs = require('express-handlebars');

const morgan = require('morgan');
const multer = require('multer');
const express = require('express');

module.exports = app => {

    // SETTINGS
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, 'views'));
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
    app.use(express)

    // ROUTES

    // ERRORHANDLERS

    return app;
}

