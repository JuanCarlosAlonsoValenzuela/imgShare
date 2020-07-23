const moment = require('moment');

const helpers = {};

// Instalamos el paquete moment con npm i moment y la importamos
helpers.timeago = timestamp => {
    return moment(timestamp).startOf('minute').fromNow();
};

module.exports = helpers;

