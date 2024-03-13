const client = require('../database');

const InsertarVenta = async (factura) => {
	try {
		await client.query('BEGIN')
		const sql_venta = 'INSERT INTO ventas (fecha_venta, nro_factura, cdc, estado, id_cliente, id_caja) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_venta'
		const values = [
			factura.fecha_venta,
			factura.nro_factura,
			factura.cdc,
			factura.estado,
			factura.id_cliente,
			factura.id_caja
		  ];
		const venta = await client.query(sql_venta, values);
		
		const sql_detalles = 'INSERT INTO venta_detalles (cantidad, precio_unitario, id_servicio, id_venta, id_empleada) VALUES ($1, $2, $3, $4, $5)'
		for (let i = 0; i < factura.detalles.length; i++) {
			const values_detalles = [
				factura.detalles[i].cantidad,
				factura.detalles[i].precio_unitario,
				factura.detalles[i].id_servicio,
				venta.rows[0].id_venta,
				factura.detalles[i].id_empleada
			];
			await client.query(sql_detalles, values_detalles);
		}
		const sql_pagos = 'INSERT INTO pagos (monto_pago, id_venta, id_metodo_pago) VALUES ($1, $2, $3)'
		for (let i = 0; i < factura.pagos.length; i++) {
			const values_pagos = [
				factura.pagos[i].monto,
				venta.rows[0].id_venta,
				factura.pagos[i].tipo
			];
			await client.query(sql_pagos, values_pagos);
		}
		await client.query('COMMIT')
	}catch (error) {
		await client.query('ROLLBACK')
		console.log(error.detail);
		throw (error.detail);
	}
};

const ObtenerNroFactura = async () => {
	const sql = 'SELECT nro_factura + 1 as nro_factura FROM ventas ORDER BY nro_factura DESC LIMIT 1';
	const nro_factura = await client.query(sql);
	return nro_factura.rows[0];
};


module.exports = {InsertarVenta, ObtenerNroFactura};