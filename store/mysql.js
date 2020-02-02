const mysql = require("mysql");

const { config } = require("../config/index");

let connection;

function handleConnection() {
  connection = mysql.createConnection(config.mysql);

  connection.connect(err => {
    if (err) {
      console.log("[db err]", err);
    } else {
      console.log("db connected");
    }
    // setTimeout(handleConnection, 2000);
  });

  connection.on("error", err => {
    console.error("[db err]", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleConnection();
    } else {
      throw err;
    }
  });
}

handleConnection();

function list(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${table}`,
      (error, data) => {
        if (error) return reject(error);
        resolve(data);
      }
    );
  });
}

module.exports = {
    list
}
