const { InsertarCliente,ObtenerClientePorId, ObtenerCumpleaños } = require('../models/clienteModel');

const agregarCliente = async (req, res) => {
	try {
		// Supongamos que los datos del nuevo cliente están en el cuerpo de la solicitud (req.body)
		const nuevoCliente = req.body;
		// Validar que los datos necesarios estén presentes
		if (!nuevoCliente.nombre || !nuevoCliente.apellido || !nuevoCliente.fecha_nacimiento) {
			return res.status(400).json({ error: 'Nombre, apellido y fecha de nacimiento son campos obligatorios' });
		}

		// Llamar al método del modelo para crear un nuevo cliente
		await InsertarCliente(nuevoCliente)
		res.status(201).json({ mensaje: 'Cliente creado correctamente' });
	} catch (error) {
		console.error('Error en el controlador:', error);
		res.status(500).json({ error });
	}
}

const obtenerClientePorId = async (req, res) => {
	try {
		// Supongamos que el id del cliente está en el parámetro de la solicitud (req.params)
		const id = req.params.id;
		// Validar que el id esté presente
		if (!id) {
			return res.status(400).json({ error: 'El id es un campo obligatorio' });
		}
		// Llamar al método del modelo para obtener el cliente por id
		const cliente = await ObtenerClientePorId(id);
		res.status(200).json(cliente);
	}
	catch (error) {
		console.error('Error en el controlador:', error);
		res.status(500).json({ error });
	}
};

const obtenerCumpleaños = async (req, res) => {
	try {
		const cumpleaños = await ObtenerCumpleaños();
		res.status(200).json(cumpleaños);
	}
	catch (error) {
		console.error('Error en el controlador:', error);
		res.status(500).json({ error });
	}
};


module.exports = { agregarCliente, obtenerClientePorId, obtenerCumpleaños };
