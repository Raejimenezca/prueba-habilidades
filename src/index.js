// APPLICATION STARTS

const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const { database } = require('./keys');
const passport = require('passport');
const bodyParser = require('body-parser');

// INITIALIZATIONS

// app es mi aplicacion
const app = express();
require('./lib/passport');

// settings, configuraciones del server
// asignar puerto, si ya existe uno lo toma y si no escoge el 4000
app.set('port', process.env.PORT || 4000);
// establecer en donde esta la carpeta views, '__dirname' const es la carpeta donde esta el proyecto y se le concatena 'views'
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    // el metodo join lo que hace es unir directorios
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

// MIDDLEWARES, funciones que se ejecutan cuando un usario cliente envia una peticion
app.use(session({
    secret: 'rafamysqlsession',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
// funcionalidad para poder enviar mensajes  
app.use(flash());
// param. 'dev' para logs del server
app.use(morgan('dev'));
// tan solo se van a aceptar formatos sencillos 
app.use(express.urlencoded({extended: false}));
// para enviar json con el cliente
app.use(express.json());
// inicializar passport
app.use(passport.initialize());
app.use(passport.session());

// bodyparser para gestionar las peticiones de los clientes en REST
app.use(bodyParser.json());

// GLOBAL VARS, variables que toda la aplicacion necesite
app.use((req, res, next) =>{
    // almacenar el mensaje 'success' en una variable global para que este disponible en todas las vistas 
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    // hacer que el usuario sea una variable global 
    app.locals.user = req.user;
    next();
});

// ROUTES, urls, no es necesario poner el nombre del archivo pq node busca el index automaticamente
app.use(require('./routes'));
app.use(require('./routes/authentication'));
// para acceder a las rutas hay que poner (/pedidos)
app.use('/pedidos', require('./routes/pedidos'));


// Public, todo el codigo que el navegador puede acceder
app.use(express.static(path.join(__dirname, 'public')));

// STARTING SERVER, empieza a correr el servidor en el puerto que definimos previamente
app.listen(app.get('port'), () =>{
    console.log('Server on port', app.get('port'));
});