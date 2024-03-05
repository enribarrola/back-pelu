const express = require('express');
const router = express.Router();

const { obtenerServicios } = require('../controllers/servicioController');

router.get('/servicios', obtenerServicios);



module.exports = router;