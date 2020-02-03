require("dotenv").config();

const config = {
  api: {
    port: process.env.PORT || 3000
  },
  jwt: {
    secret: process.env.JWT_SECRET || "notasecret!"
  },
  mysql: {
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
    port: process.env.MYSQL_PORT || "3306",
  },
  mysqlService: {
    port: process.env.MYSQl_SRV_PORT || 3001
  }
};

module.exports = { config };
