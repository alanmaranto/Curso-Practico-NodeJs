const express = require('express');
const app = express();
const { api } = require('../config/index');
const user = require('./components/user/network')

const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/user', user);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.listen(api.port, () => {
    console.log(`Api escuchando en el puerto ${api.port}`)
})