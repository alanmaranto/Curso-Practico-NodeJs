const remote = require('./remote');
const config = require('../config/index');

module.exports = new remote(config.config.cacheService.host, config.config.cacheService.port)