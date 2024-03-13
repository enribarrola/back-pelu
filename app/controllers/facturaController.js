const { facturaServicio } = require('../servicios/facturaServicio/facturaServicio');
const { ObtenerNroFactura } = require('../models/facturaModel');

const facturar = async (req, res) => {
	try {
		// Supongamos que los datos de la factura están en el cuerpo de la solicitud (req.body)
		const nuevaFactura = req.body;
		facturaServicio(nuevaFactura);
		res.status(200).json({status:200});
	} catch (error) {
		console.error('Error en el controlador:', error);
		res.status(403).json({ error });
	}
}

const obtenerNroFactura = async (req, res) => {
	try {
		const nro = await ObtenerNroFactura();
		res.status(200).json(nro);
	} catch (error) {
		console.error('Error en el controlador:', error);
		res.status(403).json({ error });
	}
}


module.exports = { facturar, obtenerNroFactura };