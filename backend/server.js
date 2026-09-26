const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://glosario-ti-frontend.onrender.com',
    'https://glosarioti.onrender.com',
    /\.onrender\.com$/
  ],
  credentials: true
}));
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado a MongoDB Atlas'))
.catch(err => console.error('❌ Error de conexión:', err));

// Rutas
app.use('/api/terminos', require('./routes/terminos'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/favoritos', require('./routes/favoritos'));

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 API del Glosario TI funcionando!',
    version: '1.0.0',
    endpoints: {
      obtenerTerminos: 'GET /api/terminos',
      crearTermino: 'POST /api/terminos',
      eliminarTermino: 'DELETE /api/terminos/:id',
      registro: 'POST /api/auth/registro',
      login: 'POST /api/auth/login',
      favoritos: 'GET/POST/DELETE /api/favoritos'
    }
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo salió mal en el servidor' });
});

// Ruta 404
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`📚 Glosario TI API activa`);
});