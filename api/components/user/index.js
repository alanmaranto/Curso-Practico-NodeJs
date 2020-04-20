// const store = require('../../../store/mysql');
const store = require('../../../store/remote-mysql');
const ctrl = require('./controller')

// Controlador como funcion que tiene la db
module.exports = ctrl(store);