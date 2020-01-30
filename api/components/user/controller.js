const express = require('express');
const response = require('../../../utils/response')
const Action = require('./action')
const router = express.Router();

router.get('/', (req,res) => {
    const lista = Action.list();
    response.success(req,res, lista, 200);
});

module.exports = router