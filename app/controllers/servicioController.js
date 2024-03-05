const {
	ObtenerServicios
} = require('../models/servicioModel');

const obtenerServicios = async (req, res) => {
	try {
		const servicios = await ObtenerServicios();
		res.status(200).json(servicios);
	}
	catch (error) {
		console.error('Error en el controlador:', error);
		res.status(500).json({ error });
	}
}

module.exports = { obtenerServicios };