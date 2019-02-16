// almacenar las rutas principales de la app
// rutas de bienvenida, de contacto

const express = require('express');

// devuelve un objeto y lo almacenamos en router
const router = express.Router();

// definir una ruta inicial a router
router.get('/', (req, res) =>{
    res.render('index');
});

// lo exportamos
module.exports = router;