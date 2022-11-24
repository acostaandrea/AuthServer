const {Router} = require('express');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');

const router = Router();

// CREAR UN NUEVO USUARIO
router.post('/new', crearUsuario);

// LOGIN USUARIO
router.post('/', loginUsuario);

// validar y revalidar token 
router.get('/renew', revalidarToken) 




module.exports= router;