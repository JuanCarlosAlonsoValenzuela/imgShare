// Un controlador es un objeto con funciones para exportar
const ctrl = {};

const { Image } = require('../models');

// Importamos sidebar
const sidebar = require('../helpers/sidebar');

ctrl.index = async (req, res) => {
    const images = await Image.find().sort({timestamp: -1});

    let viewModel = {images: []};
    viewModel.images = images.map(image => image.toJSON());

    viewModel = await sidebar(viewModel);

    res.render('index', viewModel);
};

// Exportamos
module.exports = ctrl; 


