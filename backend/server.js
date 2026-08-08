require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const ticketsRouter = require('./routes/tickets');

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*' }));
app.use(express.json());

// Ruta de salud (útil para verificar que Render desplegó bien)
app.get('/', (req, res) => {
  res.json({ mensaje: 'API Help Desk funcionando correctamente 🚀' });
});

// Rutas de la API
app.use('/api/tickets', ticketsRouter);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

// Conexión a MongoDB Atlas y arranque del servidor
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`✅ Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error al conectar a MongoDB:', error.message);
    process.exit(1);
  });
module.exports = app;