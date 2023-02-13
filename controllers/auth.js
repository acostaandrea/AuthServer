const {response} = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs')
const {generarJWT} = require('../helpers/jwt')



const crearUsuario = async (req, res = response) => {
    
    const{email, name, password} = req.body;

    try {
        
            // verificar el email
            const usuario = await Usuario.findOne({email:email})
            // verifica que usuario exite
            if(usuario){
                return res.status(400).json({
                    ok: false,
                    msg: 'El usuario ya existe con ese email'
                });
            }
            
            // Crear usuario con el modelo
            const dbUser = new Usuario(req.body);

            // hashear la constraseña
            const salt = bcrypt.genSaltSync();
            dbUser.password = bcrypt.hashSync(password, salt)

            // generar el  JWT

            const token = await generarJWT(dbUser.id, name);

            // crear usuario de DB
            await dbUser.save();

            // generar respuesta exitosa
            return res.status(201).json({
                ok: true,
                uid: dbUser.id,
                name,
                email,
                token
            })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el admin'
        })
    }
  
    
    
}

const loginUsuario = async (req, res) => {
   
    const{email,  password} = req.body;

    try {
        const dbUser = await Usuario.findOne({email: email});
        // verifica si hay un usuario cuyo email existe
        if(!dbUser){
            return res.status(400).json({
                ok: false,
                // se debe colocar como msg las credenciales no son validas
                msg: 'El correo no existe' 
                
            });
        }
        // confirma si el password hace match
        // el compareSync sirve 
        const validPassword = bcrypt.compareSync(password, dbUser.password);
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                // se debe colocar como msg las credenciales no son validas
                msg: 'El password no es valido' 
                
            });
        }
        // generar el JWT
        const token = await generarJWT(dbUser.id, dbUser.name);

        // respuesta del servicio
        return res.json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            token

        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
    
}

const revalidarToken = async (req, res) => {
    const {uid }  = req;
    // leer la base de datos para obtener el email
    const dbUser = await Usuario.findById(uid);

     // generar el JWT
     const token = await generarJWT(uid, dbUser.name);

    return res.json({
        ok: true,
       uid, 
       name: dbUser.name,
       email: dbUser.email,
       token
        
    })
}


module.exports={
    crearUsuario,
    loginUsuario,
    revalidarToken
}

// se puede hacer un JWT con validez infinita entonces cuando cierra la ventana del navegador web, como lo guarda en el session storage entonces se borra y tiene que volver a iniciar sesion la proxima vez