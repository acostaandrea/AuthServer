const {Router} = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// CREAR UN NUEVO USUARIO
router.post('/new',[
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').isLength({min: 6}),
    validarCampos
] ,crearUsuario);

// LOGIN USUARIO
// en el segundo argumento se ponen los middlewares, que tienen que pasar antes de llegar al controlardor
router.post('/',[
    check('email','El email es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').isLength({min: 6}),
    validarCampos
] ,loginUsuario);

// validar y revalidar token 
router.get('/renew', validarJWT,revalidarToken) 



// para exportar en node
module.exports= router;