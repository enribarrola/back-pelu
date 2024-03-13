const express = require('express');
const router = express.Router();

const { facturar, obtenerNroFactura} = require('../controllers/facturaController');

router.post('/factura', facturar);
router.get('/factura/nro-factura', obtenerNroFactura)



module.exports = router;