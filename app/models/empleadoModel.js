const client = require('../database');

const ObtenerEmpleados = async (id) => {
	try {
		const sql = `SELECT * FROM empleadas e  order by e.id_empleada asc `;
		const result = await client.query(sql);
		return result.rows;
	}catch (error) {
		console.log(error);
		throw (error.detail);
	}
};

module.exports = {ObtenerEmpleados};