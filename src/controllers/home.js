// Un controlador es un objeto con funciones para exportar
const ctrl = {};

ctrl.index = (req, res) => {
    res.send('Index page');
};

// Exportamos
module.exports = ctrl; 