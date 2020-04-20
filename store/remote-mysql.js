const remote = require('./remote');
const config = require('../config/index');

module.exports = new remote(config.config.mysqlService.host, config.config.mysqlService.port)