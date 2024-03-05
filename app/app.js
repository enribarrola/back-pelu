const express = require('express');
const app = express();
const cors = require('cors');
// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(express.json());
app.use(cors());

// Rutas
const clientesRoutes = require('./routes/clientesRoutes');
const fichaRoutes = require('./routes/fichaRoutes');
const serviciosRoutes = require('./routes/serviciosRoutes');
const empleadoRoutes = require('./routes/empleadoRoutes');
const listaVariosRoutes = require('./routes/listaVariosRoutes');
// Agrega más routers según sea necesario

// Montar los routers en las rutas específicas
app.use('/api', clientesRoutes);
app.use('/api', fichaRoutes);
app.use('/api', serviciosRoutes);
app.use('/api', empleadoRoutes);
app.use('/api', listaVariosRoutes);
// Agrega más montajes de routers según sea necesario

// Manejador de errores para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejador de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`La aplicación está escuchando en http://localhost:${port}`);
});