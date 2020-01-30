const express = require('express');
const app = express();
const { api } = require('../config/index');
const user = require('./components/user/controller')

app.use('/api/user', user);

app.listen(api.port, () => {
    console.log(`Api escuchando en el puerto ${api.port}`)
})