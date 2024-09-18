const express = require('express');
const mongoose = require('mongoose');  // Importa mongoose
require('dotenv').config();  // Carga las variables de entorno desde .env

const app = express();

// Conectar a la base de datos
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado a MongoDB'))
  .catch((error) => console.error('Error al conectar a MongoDB:', error));

// Importar el router de mocks
const mocksRouter = require('./routes/mocks.router');

// Middleware para parsear el body en JSON
app.use(express.json());

// Usar el router bajo la ruta base /api/mocks
app.use('/api/mocks', mocksRouter);

// Ruta base para manejar GET /
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la API de mocks!');
});

// Configuración del puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
