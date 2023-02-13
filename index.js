const express = require('express');
const cors = require('cors');
const path = require('path');

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

// manejar demas rutas
app.get('*', (req, res)=> {
    res.sendFile(path.resolve(__dirname, 'public/index.html'))
});

// 4000 es el puerto donde se levanta la aplicacion, luyego sigue el callback 
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});