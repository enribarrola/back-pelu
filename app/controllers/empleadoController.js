const { ObtenerEmpleados } = require('../models/empleadoModel');

const obtenerEmpleados = async (req, res) => {
	try {
		const empleados = await ObtenerEmpleados();
		res.status(200).json(empleados);
	}
	catch (error) {
		console.error('Error en el controlador:', error);
		res.status(500).json({ error });
	}
};

module.exports = {obtenerEmpleados};