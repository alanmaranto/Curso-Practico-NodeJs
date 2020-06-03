// const store = require('../../../store/mysql');
const { config } = require("../../../config/index");
let store;
if (config.remoteDB) {
  store = require("../../../store/remote-mysql");
} else {
  store = require("../../../store/mysql");
}

const ctrl = require("./controller");

// Controlador como funcion que tiene la db
module.exports = ctrl(store);
