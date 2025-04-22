const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Muy importante para que lea req.body

// Rutas
app.use('/api/usuarios', require('./routes/usuario.routes')); // ← esta línea es clave

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Conectado a MongoDB Atlas");

    // Inicia servidor SOLO si se conecta a MongoDB
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Servidor en puerto ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ Error al conectar a MongoDB:", err);
  });
