const express = require('express');
const router = express.Router();
const {agregarCliente,obtenerClientePorId, obtenerCumpleaños} = require('../controllers/clienteController');

// Ruta para el endpoint "nuevo-cliente"
router.post('/nuevo-cliente', agregarCliente);
router.get('/cliente/id/:id', obtenerClientePorId);

router.get('/cliente/cumpleanos', obtenerCumpleaños);


module.exports = router;