const express = require('express');


//Crear el servidos/aplicacion de express

const app = express()

//Rutas
app.use('/api/auth', require('./routes/auth'));


app.listen(4000, () => {
    console.log(`Servidor corriendo en puerto ${ 4000 }`);
});