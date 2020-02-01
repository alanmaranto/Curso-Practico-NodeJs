const store = require('../../../store/dummy');

const ctrl = require('./controller')

// Controlador como funcion que tiene la db
module.exports = ctrl(store);