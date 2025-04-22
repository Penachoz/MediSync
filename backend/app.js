const express = require('express');
const cors = require('cors');
const usuarioRoutes = require('./routes/usuario.routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/usuarios', usuarioRoutes);

module.exports = app;
