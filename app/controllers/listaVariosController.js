const { ObtenerListaTarjeta } = require('../models/listaVariosModel');

const obtenerListaTarjeta = async (req, res) => {
	try {
		const ListaTarjeta = await ObtenerListaTarjeta();
		res.status(200).json(ListaTarjeta);
	}
	catch (error) {
		console.error('Error en el controlador:', error);
		res.status(500).json({ error });
	}
};

module.exports = {obtenerListaTarjeta};