create database peluqueria

create table tipo_contribuyente (
	id_tipo_contribuyente serial primary key,
	nombre_tipo_contribuyente varchar(30)
);

create table tipo_documento (
	id_tipo_documento serial primary key,
	nombre_tipo_documento varchar(30)
);

CREATE TABLE clientes (
    id_cliente SERIAL PRIMARY KEY,
    contribuyente bool not null,
    razon_social varchar(55) not null,
    pais varchar(10) not null,
    correo_electronico TEXT UNIQUE,
    tipo_contribuyente int references tipo_contribuyente(id_tipo_contribuyente),
    documento_tipo int not null references tipo_documento(id_tipo_documento),
    nro_documento int not null,
    celular TEXT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_nacimiento DATE NOT NULL,
    ruc varchar(15)
);

select setval('clientes_id_cliente_seq', 100, false) 

create table tipo_servicio(
	id_tipo_servicio serial primary key,
	nombre_tipo_servicio text not null
)

CREATE TABLE servicios (
    id_servicio SERIAL PRIMARY KEY,
    nombre_servicio TEXT UNIQUE NOT NULL,
    costo_servicio int,
    descripcion text,
    id_tipo_servicio int references tipo_servicio(id_tipo_servicio)
);

CREATE TABLE ficha_servicios (
    id_servicio SERIAL PRIMARY KEY,
    id_cliente INT REFERENCES clientes(id_cliente),
    fecha_servicio TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    tipo_servicio INT REFERENCES servicios(id_servicio),
    costo INT,
    observaciones TEXT
);


create table empleadas(
	id_empleada SERIAL primary key,
	nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    correo_electronico TEXT UNIQUE,
    telefono TEXT,
    direccion TEXT,
    fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_nacimiento DATE NOT null,
    activa boolean default true
);

create table comisiones(
	id_comision serial primary key,
	id_empleada int references empleadas(id_empleada),
	id_servicio int references servicios(id_servicio),
	comision decimal not null
);





create table tipo_pago(
	id_tipo_pago serial primary key,
	nombre_tipo_pago text not null
)

-----------------------------------------------------
create table cajas(
	id_caja serial primary key,
	estado bool not null,
	fecha_apertura timestamp not null default CURRENT_TIMESTAMP,
	fecha_cierre timestamp,
	saldo_inicial int not null
);

create table arqueo_caja(
	id_arqueo serial primary key,
	fecha_arqueo timestamp  not null default CURRENT_TIMESTAMP,
	efectivo int not null default 0,
	tarjeta_credito int not null default 0,
	tarjeta_debito int not null default 0,
	transferencia_sipap int not null default 0,
	cheque int not null default 0,
	diferencia int not null,
	id_caja int not null references cajas(id_caja)
);

create table estado_venta(
	id_estado_venta serial primary key,
	nombre_estado text not null
)

create table ventas(
	id_venta serial primary key,
	fecha_venta timestamp not null,
	nro_factura int not null,
	cdc varchar(50) not null,
	estado int not null references estado_venta(id_estado_venta),
	id_cliente int not null references clientes(id_cliente),
	id_caja int not null references cajas(id_caja)
)

create table venta_detalles(
	id_venta_detalle serial primary key,
	cantidad int not null,
	precio_unitario int not null,
	id_servicio int not null references servicios(id_servicio),
	id_venta int not null references ventas(id_venta),
	id_empleada int not null references empleadas(id_empleada)
)

create table metodos_pago(
	id_metodo_pago serial primary key,
	nombre_metodo_pago varchar(20) not null
)

create table pagos(
	id_pago serial primary key,
	monto_pago int not null,
	id_venta int not null references ventas(id_venta),
	id_metodo_pago int not null references metodos_pago(id_metodo_pago)
)


--este es para el arqueo 
SELECT 
    mp.nombre_metodo_pago AS Metodo,
    SUM(p.monto_pago) AS TotalVentas
FROM 
    ventas v 
JOIN 
    pagos p ON v.id_venta = p.id_venta 
JOIN 
    metodos_pago mp ON p.id_metodo_pago = mp.id_metodo_pago 
WHERE 
    v.estado = 1 -- Considera solo las ventas cerradasand 
    and v.id_caja = 1
   -- AND v.fecha_venta >= '2024-03-02 17:15' -- Reemplaza con la fecha del día
    --AND v.fecha_venta < '2024-03-03' -- Reemplaza con la fecha del día siguiente
GROUP BY 
    mp.nombre_metodo_pago ;
   
   
---suma total sin calcular la comision por empleada
   SELECT
    e.id_empleada,
    e.nombre,
    e.apellido,
    SUM(vd.cantidad * vd.precio_unitario) AS monto_total
FROM
    empleadas e
JOIN
    venta_detalles vd ON e.id_empleada = vd.id_empleada
JOIN
    ventas v ON vd.id_venta = v.id_venta
WHERE
    v.fecha_venta BETWEEN '2024-03-01 00:01' AND '2024-03-03 23:59' -- Reemplaza con el rango de fechas deseado
GROUP BY
    e.id_empleada, e.nombre, e.apellido;

---suma total con la comision aplicada por empleada
   SELECT
    e.id_empleada,
    e.nombre,
    e.apellido,
    SUM(vd.cantidad * vd.precio_unitario * (c.comision / 100)) AS monto_total
FROM
    empleadas e
JOIN
    venta_detalles vd ON e.id_empleada = vd.id_empleada
JOIN
    comisiones c ON e.id_empleada = c.id_empleada AND vd.id_servicio = c.id_servicio
JOIN
    ventas v ON vd.id_venta = v.id_venta
WHERE
    v.fecha_venta BETWEEN '2024-03-01 00:01' AND '2024-03-03 23:59' -- Reemplaza con el rango de fechas deseado
GROUP BY
    e.id_empleada, e.nombre, e.apellido;

   
   
   
   
   
   
   
   
   
   
   
   
select to_char(fs.fecha_servicio,'dd/mm/yyyy') as fecha_servicio, s.nombre_servicio ,to_char(fs.costo,'99,999,999') as costo 
		from ficha_servicios fs
		inner join clientes c on c.id_cliente = fs.id_cliente
		inner join servicios s on s.id_servicio = fs.tipo_servicio 
		where lower(c.nombre) Like '%449919%' or c.ruc like '%449919%' order by fs.fecha_servicio desc LIMIT 20 OFFSET 3
		
		
select count(*) as total 
from ficha_servicios fs
inner join clientes c on c.id_cliente = fs.id_cliente
where fs.id_cliente = cast('1' as integer)or lower(c.nombre) like '%enrique%' or c.ruc like '%enrique%'





   