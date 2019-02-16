// conexión a mysql

const mysql = require('mysql');
const { promisify } = require('util');
// solo trae la propiedad 'database' del objeto 'keys'
const { database }  = require('./keys');

// crea hilos que se van ejecutando en produccion, nos genera la conexion a la base de datos
const pool = mysql.createPool(database);
pool.getConnection((err, connection) =>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE CONNECTION WAS CLOSED');            
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TOO MANY CONNECTIONS');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }

    if(connection) connection.release();
    console.log('DB is Connected');
    return;
});

// gracias a esta linea siempre que se vayan a hacer consultas se pueden hacer como promesas
// promisify pool querys, hacer por querys lo que antes se hacia con 'callbacks'
pool.query = promisify(pool.query);

// exportart el modulo
module.exports = pool;