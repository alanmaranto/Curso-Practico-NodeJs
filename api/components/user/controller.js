const express = require('express');
const response = require('../../../utils/response')

const router = express.Router();

router.get('/', (req,res) => {
    res.send('Todo funciona');
    response.success(req,res, 'Todo correcto', 200);
});

module.exports = router