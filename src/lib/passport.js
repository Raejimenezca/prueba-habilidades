// Aca vamos a definir nuestros metodos de autenticacion

// passport permite autenticar con bases de datos como FB, TW ... pero en este caso usaremos la DB local
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');

// passport para el 'signin'
passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password', // nombre de variables en el campo de texto del formulario
    passReqToCallback: true
}, async (req, email, password, done) => {
    //console.log(req.body);
    const rows = await pool.query('SELECT * FROM usuario WHERE email = ?', [email]);
    // si el usuario existe, valido su contraseña
    if(rows.length > 0){
        // Usuario que he encontrado en la base de datos, posicion '0' del arreglo
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.clave);
        if(validPassword){
            done(null, user, req.flash('success', 'Bienvenido ' + user.nombre_completo));
        }else {
            done(null, false, req.flash('message', 'Contraseña invalida'));
        }
    } 
    else { // si el usuario no existe no devuelve usuario
        return done(null, false, req.flash('message', 'El nombre de usuario no existe'));
    }
})); 

// passport para el 'signup'
passport.use('local.signup', new LocalStrategy({
    // definir a traves de que campos se le van a dar los valores de autenticacion
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, clave, done) => {
    const { fullname, tel, dir, ciudad, cod_postal } = req.body;
    const newUser = {
        email,
        clave,
        nombre_completo: fullname,
        telefono: tel,
        direccion: dir,
        cod_municipio: ciudad,
        cod_postal
    };
    newUser.clave = await helpers.encryptPassword(clave);
    const result = await pool.query('INSERT INTO usuario SET ?', [newUser]);
    newUser.id = result.insertId;
    return done(null, newUser);
}));

// serializar un usuario para guardarlo dentro de la sesion, por id
passport.serializeUser((user, done) =>{
    done(null, user.id);
}); 

// desserializar el usuario, tomando id almacenado para obtener los datos 
passport.deserializeUser( async (id, done) =>{
    const rows = await pool.query('SELECT * FROM usuario WHERE id = ?', [id]);
    // retorna un arreglo del cual solo me interesa la primera y unica posicion
    done(null, rows[0]);
});