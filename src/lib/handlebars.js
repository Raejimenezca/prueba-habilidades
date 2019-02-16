// para manejar bibliotecas como timeago.js

const { format } = require('timeago.js');

// objeto que voy a poder utilizar entre las vistas 
const helpers = {};

// convierte el formato 'timestamp' a uno legible por el usuario
helpers.timeago = (timestamp) => {
    return format(timestamp);
};

module.exports = helpers;