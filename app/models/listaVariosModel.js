const client = require('../database');

const ObtenerListaTarjeta = async () => {
	try {
		const sql = `select * from tipo_pago`;
		const result = await client.query(sql);
		return result.rows;
	}catch (error) {
		console.log(error);
		throw (error.detail);
	}
};

module.exports = {ObtenerListaTarjeta};