const express = require('express');
const router = express.Router();
const {obtenerListaTarjeta} = require('../controllers/listaVariosController');

// Ruta para el endpoint "nueva-ficha"
router.get('/lista/tarjetas', obtenerListaTarjeta);

// Puedes agregar más rutas según sea necesario

module.exports = router;