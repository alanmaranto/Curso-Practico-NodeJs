const jwt = require("jsonwebtoken");
const { config } = require("../config/index");
const error = require("../utils/error");

function sign(data) {
  return jwt.sign(data, config.jwt.secret);
}

function verifyToken(token) {
  return jwt.verify(token, config.jwt.secret);
}

const check = {
  own: function(req, owner) {
    const decoded = decodeHeader(req);
    console.log(decoded);
    //Comprobar si es o no el usuario

    if (decoded.id !== owner) {
      throw error(`You can't do it`, 401);
    }
  }
};

function getToken(auth) {
  if (!auth) {
    throw error(`There is not token`, 401);
  }

  if (auth.indexOf("Bearer ") === -1) {
    throw error(`Invalid format`, 401);
  }

  let token = auth.replace("Bearer ", "");

  return token;
}

function decodeHeader(req) {
  const authorization = req.headers.authorization || "";
  const token = getToken(authorization);
  const decoded = verifyToken(token);

  req.user = decoded;

  return decoded;
}

module.exports = {
  sign,
  check
};
