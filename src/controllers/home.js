// Un controlador es un objeto con funciones para exportar
const ctrl = {};

const { Image } = require('../models');

ctrl.index = async (req, res) => {
    // Busca todas las imágenes ordenadas por fecha de creación
    // 1 para ascendente y -1 para descendente
    const images = await Image.find().sort({timestamp: -1});

    // Pasamos las imágenes como parámetro dentro de corchetes
    res.render('index', {"images": images.map(image => image.toJSON())});
};

// Exportamos
module.exports = ctrl; 


