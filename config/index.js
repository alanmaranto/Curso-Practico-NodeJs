require("dotenv").config();

const config = {
  api: {
    port: process.env.PORT || 3000,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "notasecret!",
  },
  mysql: {
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASS || 'password',
    database: process.env.MYSQL_DB || 'socialPlatform',
    port: process.env.MYSQL_PORT || "3306",
  },
  mysqlService: {
    port: process.env.MYSQl_SRV_PORT || 3001,
    host: process.env.MYSQL_SRV_HOST || "localhost",
  },
  post: {
    port: process.env.POST_PORT || 3002,
  },
  remoteDB: process.env.REMOTE_DB || false,
  cacheService: {
    port: process.env.REDIS_SRV_PORT || 3003,
    host: process.env.REDIS_SRV_HOST || "localhost",
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASS,
  }
};

module.exports = { config };
