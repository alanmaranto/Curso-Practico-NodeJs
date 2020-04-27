const express = require('express');
const app = express();
const { config } = require('../config/index');
const errors = require('../utils/errors');

const post = require('./components/post/network')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Router
app.use('/api/post', post);

// Debe ser el ultimo middleware
app.use(errors);

app.listen(config.post.port, () => {
    console.log(`Servicio POST escuchando en el puerto ${config.post.port}`)
})