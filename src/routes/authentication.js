// autenticacion
const express = require('express');
const router = express.Router();
const passport = require('passport');
const pool = require('../database');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');
const helpers = require('../lib/helpers');

// renderizar el formulario de registro
// no deberían protegerse las rutas ya que es para registro solamente
router.get('/signup', isNotLoggedIn, (req, res) =>{
    res.render('auth/signup');
});

// recibir los datos del formulario
router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup', // vuelve a ver el formulario
        failureFlash: true
    }));

// renderizar formulario de inicio de sesion
router.get('/signin', isNotLoggedIn, (req, res) =>{
    res.render('auth/signin');
});


router.post('/signin', isNotLoggedIn, passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
})); 

router.get('/editu/:id', isLoggedIn, async (req, res ) => {
    const { id } = req.params;
    const usuarios = await pool.query('SELECT * FROM usuario WHERE id = ?', [id]);
    // como me devuelve un arreglo con el objeto , cogemos la posicion 0 que es lo unico que interesa
    res.render('editu', {usuario: usuarios[0]});
});

router.post('/editu/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const {email, password, fullname, tel, dir, ciudad, cod_postal} = req.body;
    const newUser = {
        email,
        clave: password,
        nombre_completo: fullname,
        telefono: tel,
        direccion: dir,
        cod_municipio: ciudad,
        cod_postal
    }
    //console.log(newUser);
    newUser.clave = await helpers.encryptPassword(newUser.clave);
    //console.log(newUser);
    await pool.query('UPDATE usuario SET ? WHERE id = ?', [newUser, id]); 
    req.flash('success', 'Usuario actualizado satisfactoriamente');
    res.redirect('/profile');
}); 

/*router.post('/signin', (req, res, next) =>{
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    });(req, res, next);
}); */

// para enviar la ruta del perfil
// isLoggedIn: la vista queda protegida si el usuario no esta loggeado     
router.get('/profile', isLoggedIn, (req, res) =>{
    res.render('profile');
});

// ruta para cerrar sesión (limpiar la sesion)
router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/signin');
});

module.exports = router;