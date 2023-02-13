const { Schema, model } = require('mongoose');

// schema es una funcion que se ejecuta con ciertos argumentos 
const UsuarioSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

});

module.exports= model('Usuario', UsuarioSchema)