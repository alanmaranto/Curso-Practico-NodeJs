const express = require('express');
const { config } = require('../config/index');
const router = require('./network');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use('/', router)

app.listen(config.cacheService.port, () => {
    console.log(`Servicio de caché redis escuchando en el puerto ${config.cacheService.port}`)
});
