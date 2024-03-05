const express = require('express');
const router = express.Router();

const { obtenerEmpleados } = require('../controllers/empleadoController');

router.get('/empleados', obtenerEmpleados);



module.exports = router;