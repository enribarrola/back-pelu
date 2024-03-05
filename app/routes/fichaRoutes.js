// routes/fichaRoutes.js
const express = require('express');
const router = express.Router();
const {crearFicha,obtenerFichaPorId,obtenerFichaPorRuc} = require('../controllers/fichaController');

// Ruta para el endpoint "nueva-ficha"
router.post('/agregar-ficha', crearFicha);

// Ruta para el endpoint "obtener-fichas"
router.post('/obtener-fichas/:id',obtenerFichaPorId);

// Ruta para el endpoint "obtener-fichas"
router.post('/obtener-fichas-ruc/:id',obtenerFichaPorRuc);

// Puedes agregar más rutas según sea necesario

module.exports = router;
