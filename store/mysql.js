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

function list(table) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (error, data) => {
      if (error) return reject(error);
      resolve(data);
    });
  });
}

function get(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE id=${id}`, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function insert(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

function update(table, data) {
  console.log("updateData", data);
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE ${table} SET ? WHERE id=?`,
      [data, data.id],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
}

function upsert(table, data) {
  if (data && data.id) {
    console.log("data", data);
    console.log("dataid", data.id);
    return update(table, data);
  } else {
    return insert(table, data);
  }
}

function query(table, query, join) {
  let joinQuery = "";
  if (join) {
    const key = Object.keys(join)[0];
    const value = join[key];
    joinQuery = `JOIN ${key} ON ${table}.${value} = ${key}.id`;
  }
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE ?`, query, (err, res) => {
      if (err) return reject(err);
      resolve(res[0] || null);
    });
  });
}

module.exports = {
  list,
  get,
  upsert,
  query
};
