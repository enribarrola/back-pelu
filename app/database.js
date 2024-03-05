const { Client } = require('pg');

// Configuración de la conexión a la base de datos
const client = new Client({
  user: 'postgres',
  host: '186.122.250.25',
  database: 'peluqueria',
  password: '99.yoloco',
  port: 5432, // Puerto predeterminado de PostgreSQL
});

// Conexión a la base de datos
client.connect().then(() => {
  console.log('Conectado a la base de datos');
}).catch(error => {
  console.log(error);
});

// Exportación del módulo
module.exports = client;
