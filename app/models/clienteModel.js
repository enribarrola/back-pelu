const client = require('../database');

// Modelo del cliente
const InsertarCliente = async (nuevoCliente) => {
	try {
		const sql = 'INSERT INTO clientes (nombre, apellido, correo_electronico, telefono, direccion, fecha_nacimiento, ruc) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *'
		const values = [
			nuevoCliente.nombre,
			nuevoCliente.apellido,
			nuevoCliente.correo_electronico,
			nuevoCliente.telefono,
			nuevoCliente.direccion,
			nuevoCliente.fecha_nacimiento,
			nuevoCliente.ruc
		  ];
		const result = await client.query(sql, values);
		return result.rows;
	}catch (error) {
		console.log(error.detail);
		throw (error.detail);
	}
};

const ObtenerClientePorId = async (id) => {
	try {
		const sql = `SELECT contribuyente, ruc, razon_social as razonSocial, pais, tipo_contribuyente as tipoContribuyente,
		documento_tipo as documentoTipo, nro_documento as documentoNumero, celular,correo_electronico as email, id_cliente as codigo FROM clientes 
		WHERE nro_documento::text like $1 or lower(razon_social) like lower($2)`;
		const result = await client.query(sql, ['%'+`${id}`+'%','%'+`${id}`+'%']);
		return result.rows[0];
	}catch (error) {
		console.log(error);
		throw (error.detail);
	}
};

const ObtenerCumpleaños = async () => {
	try {
		const sql = `SELECT c.id_cliente, c.nombre, apellido, c.correo_electronico, c.telefono, c.direccion, c.fecha_registro, TO_CHAR(c.fecha_nacimiento, 'DD/MM/YYYY')::date as fecha_nacimiento , c.ruc FROM clientes c 
					WHERE 
					EXTRACT(DOY FROM c.fecha_nacimiento) BETWEEN EXTRACT(DOY FROM CURRENT_DATE) AND EXTRACT(DOY FROM CURRENT_DATE) + 5;`;
		const result = await client.query(sql);
		return result.rows;
	}catch (error) {
		console.log(error);
		throw (error.detail);
	}
};



module.exports = {InsertarCliente,ObtenerClientePorId, ObtenerCumpleaños};