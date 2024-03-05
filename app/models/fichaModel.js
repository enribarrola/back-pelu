const client = require('../database');

const InsertarFicha = async (nuevaFicha) => {
	try {
		const sql = 'INSERT INTO ficha_servicios (id_cliente, tipo_servicio, costo, observaciones) VALUES ($1, $2, $3, $4) returning *';

		const values = [
			nuevaFicha.id_cliente,
			nuevaFicha.tipo_servicio,
			nuevaFicha.costo,
			nuevaFicha.observaciones
		];
		const result = await client.query(sql, values);
		return result.rows;
	} catch (error) {
		console.error('Error en el controlador:', error);
		throw ("Error al insertar nueva ficha");
	}
}


const ObtenerTotalFichas = async (id_cliente) => {
	try {
		const sql = 'select count(*) as total from ficha_servicios where id_cliente = $1';
		const result = await client.query(sql,[id_cliente]);
		return result.rows[0].total;
	} catch (error) {
		throw ("Error al obtener total de fichas");
	}
}

const ObtenerFichaPorId = async (idFicha,offset,per_page) => {
	try {
		const sql = `select to_char(fs.fecha_servicio,'dd/mm/yyyy') as fecha_servicio, s.nombre_servicio ,to_char(fs.costo,'99,999,999') as costo 
		from ficha_servicios fs inner join servicios s on s.id_servicio = fs.tipo_servicio 
		where fs.id_cliente = $1 order by fs.fecha_servicio desc LIMIT $2 OFFSET $3`;
		const result = await client.query(sql, [idFicha,per_page,offset]);
		return result.rows;
	} catch (error) {
		throw ("Error al obtener ficha por id");
	}
}

const ObtenerFichaPorRuc = async (id,offset,per_page) => {
	try {
		const sql = `select to_char(fs.fecha_servicio,'dd/mm/yyyy') as fecha_servicio, s.nombre_servicio ,to_char(fs.costo,'99,999,999') as costo 
		from ficha_servicios fs
		inner join clientes c on c.id_cliente = fs.id_cliente
		inner join servicios s on s.id_servicio = fs.tipo_servicio 
		where lower(c.nombre) Like $1 or c.ruc like $2 order by fs.fecha_servicio desc LIMIT $3 OFFSET $4`;
		const result = await client.query(sql, ['%'+`${id}`+'%','%'+`${id}`+'%',per_page,offset]);
		return result.rows;
	} catch (error) {
		throw ("Error al obtener ficha por id");
	}
}


module.exports = { InsertarFicha, ObtenerTotalFichas, ObtenerFichaPorId, ObtenerFichaPorRuc };
