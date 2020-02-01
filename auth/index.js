const jwt = require('jsonwebtoken')
const { config } = require('../config/index');

function sign(data) {
    return jwt.sign(data, config.jwtSecret)
}

function verifyToken(token) {
    return jwt.verify(token, config.jwtSecret)
}

const check = {
    own: function (req, owner) {
        const decoded = decodeHeader(req);
        console.log(decoded);
    }
}

function getToken (auth) {
    if (!auth) {
        throw new Error('There is not token');
    }

    if (auth.indexOf('Bearer ') === -1) {
        throw new Error('Invalid format')
    }

    let token = auth.replace('Bearer ', '');

    return token;
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verifyToken(token);

    req.user = decoded;

    return decoded;
}

module.exports = {
    sign,
    check
}