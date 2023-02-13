const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
// toma la configuracion por defecto de .env
require('dotenv').config()

// console.log(process.env);


// middlewares
//Crear el servidor/aplicacion de express
const app = express()

// directorio público
app.use(express.static('public'))

// Base de datos
dbConnection();

// CORS
app.use(cors())

// lectura y parseo del  body
app.use(express.json())

//Rutas
app.use('/api/auth', require('./routes/auth'));

// 4000 es el puerto donde se levanta la aplicacion, luyego sigue el callback 
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});