const client = require('../database');

const ObtenerServicios = async (id) => {
	try {
		const sql = `SELECT * FROM servicios`;
		const result = await client.query(sql);
		return result.rows;
	}catch (error) {
		console.log(error);
		throw (error.detail);
	}
};

module.exports = {ObtenerServicios };