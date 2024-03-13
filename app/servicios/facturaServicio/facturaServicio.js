const { InsertarVenta } = require('../../models/facturaModel');

//todo: actualizar la fecha de la factura
const facturaServicio = async (factura) => {
	try {
		let detalles = factura.detalles;
		delete factura.detalles;
		console.log(factura);
		// Supongamos que los datos de la factura están en el cuerpo de la solicitud (req.body)
		var respuesta = await fetch('https://api.facturasend.com.py/paraguaygamingstore/lote/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer api_key_AD6B787F-8220-4918-A95E-00016B3CC3EA'
			},
			body: JSON.stringify([factura])
		});
		respuesta = await respuesta.json();
		if(respuesta.success == true){
			//si la factura se creo correctamente desde la api de facturasend
			const datosFactura = {
				fecha_venta: factura.fecha,
				nro_factura: factura.numero,
				cdc: respuesta.result.deList[0].cdc,
				estado: 1,
				id_cliente: Number(factura.cliente.codigo),
				id_caja: detalles.id_caja,
				detalles: detalles.detalle,
				pagos: factura.condicion.entregas	
			}
			InsertarVenta(datosFactura);
		}else{
			console.log('Error al crear la factura');
			console.log({erro: respuesta.error, descripcion: respuesta.errores[0].error});
			return new Error(respuesta.error);
		}
	} catch (error) {
		console.error('Error en el controlador:', error);
		return error;
	}
}


module.exports = { facturaServicio };
