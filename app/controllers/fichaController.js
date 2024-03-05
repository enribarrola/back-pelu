// controllers/fichaController.js
const { InsertarFicha, ObtenerTotalFichas, ObtenerFichaPorId, ObtenerFichaPorRuc } = require('../models/fichaModel');

// Manejador para el endpoint "nueva-ficha"
const crearFicha = async (req, res) => {
	try {
		// Supongamos que los datos de la nueva ficha están en el cuerpo de la solicitud (req.body)
		const nuevaFicha = req.body;

		// Validar que los datos necesarios estén presentes
		if (!nuevaFicha.id_cliente || !nuevaFicha.tipo_servicio || !nuevaFicha.costo) {
			return res.status(400).json({ error: 'Id de cliente, tipo de servicio y costo son campos obligatorios' });
		}
		const total = await ObtenerTotalFichas();
		// Llamar al método del modelo para crear una nueva ficha
		await InsertarFicha(nuevaFicha);
		res.status(201).json({ mensaje: 'Ficha creada correctamente' });
	} catch (error) {
		console.error('Error en el controlador:', error);
		res.status(500).json({ error });
	}
};

// Nuevo método para obtener una ficha por su ID
const obtenerFichaPorId = async (req, res) => {
	try {
		// Obtener el ID de la ficha desde los parámetros de la URL
		const idFicha = req.params.id;
		const total = await ObtenerTotalFichas(idFicha);
		const {page,per_page} = req.body;
		const offset = (page - 1) * per_page;
		const pages = Math.ceil(total / per_page);
		// Llamar al método del modelo para obtener la ficha por su ID
		const ficha = await ObtenerFichaPorId(idFicha,offset,per_page);
		return res.status(200).json({cantidad_paginas:pages,pagina_actual:page,ficha});
	} catch (error) {
		console.error('Error en el controlador:', error);
		res.status(500).json({ error: 'Error interno del servidor' });
	}
}

const obtenerFichaPorRuc = async (req, res) => {
	try {
		// Obtener el ID de la ficha desde los parámetros de la URL
		const idFicha = req.params.id;
		const total = await ObtenerTotalFichas(idFicha);
		const {page,per_page} = req.body;
		const offset = (page - 1) * per_page;
		const pages = Math.ceil(total / per_page);
		// Llamar al método del modelo para obtener la ficha por su ID
		const ficha = await ObtenerFichaPorRuc(idFicha,offset,per_page);
		return res.status(200).json({cantidad_paginas:pages,pagina_actual:page,ficha});
	} catch (error) {
		console.error('Error en el controlador:', error);
		res.status(500).json({ error: 'Error interno del servidor' });
	}
}

// Otros métodos del controlador podrían ir aquí

module.exports = { crearFicha, obtenerFichaPorId,obtenerFichaPorRuc };
