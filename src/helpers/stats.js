// Importamos los modelos

const { Image, Comment } = require('../models');

// Número total de imágenes del sitio
async function imageCounter() {
    return await Image.countDocuments();
}

// Número total de comentarios del sitio
async function commentsCounter() {
    return await Comment.countDocuments();
}

// Total de visitas de todas las imágenes
async function imageTotalViewsCounter() {
    const result = await Image.aggregate([{$group: {
        _id: '1',
        viewsTotal: {$sum: '$views'}
    }}]);

    return result[0].viewsTotal;
}

async function likesTotalCounter() {
    const result = await Image.aggregate([{$group: {
        _id: '1',
        likesTotal: {$sum: '$likes'}
    }}]);

    return result[0].likesTotal;
}

module.exports = async () => {
    // Ejecutamos todas las funciones en paralelo
    // Devolverá un array
    const result = await Promise.all([
        imageCounter(),
        commentsCounter(),
        imageTotalViewsCounter(),
        likesTotalCounter()
    ]);

    return {
        images: result[0],
        comments: result[1],
        views: result[2],
        likes: result[3]
    }
};