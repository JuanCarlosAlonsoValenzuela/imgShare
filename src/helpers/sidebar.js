// Cargamos el resto de helpers
const Stats = require('./stats');
const Images = require('./images');
const Comments = require('./comments');

module.exports = async viewModel => {

    const results = await Promise.all([
        // Estadísticas
        Stats(),
        // Obtenemos las imágenes más populares
        Images.popular(),
        // Comentarios
        Comments.newest()
    ]);

    viewModel.sidebar = {
        stats: results[0],
        popular: results[1].map(result => result.toJSON()),
        comments: results[2].map(result => result.toJSON())
    };

    return viewModel;
}