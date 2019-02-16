// para almacenar los enlaces (rutas)

const express = require('express');
const router = express.Router();

// .. es que esta dos niveles arriba en los directorios
// para poder hacer alguna tarea con la base de datos
// 'pool' hace referencia a la conexion con la base de datos
const pool = require('../database');
 
const { isLoggedIn } = require('../lib/auth');

// get que devuelve el servidor cuando se le hace una peticion a la ruta /prods

router.get('/prods', isLoggedIn, async (req, res) =>{
    const productos = await pool.query('SELECT * FROM producto');
    console.log(productos);
    res.render('pedidos/prods', { productos });
}); 

/*
// No hay conflicto al llamarse igual ya que son dos metodos distintos de HTTP
router.post('/prods', isLoggedIn, async (req, res) => {
    // a traves de este objeto vemos que datos nos esta enviando el formulario 
    const {title, url, description} = req.body;
    // newlink es un nuevo objeto con las mismas propiedades
    const newLink = {
        title,
        url,
        description
    }; 

    --hacer una consulta a mysql, '?' es para decir que los datos que siguen son los siguientes
    --insertamos los datos que hay en el objeto 'newLink', await, quiere decir que la peticion va a tomar tiempo, 
    --y cuando termine siga en la sgte linea, para que await funcione debe haber un asyn en la funcion ppal 
    await pool.query('INSERT INTO pedidos SET ?', [newLink]); 
    
    req.flash('success', 'Link guardado satisfactoriamente');
    
    //redirecciona a la ruta pedidos
    res.redirect('/pedidos');
}); */

// async, consulta asincrona para devolver todos los pedidos con su respectiva informacion
router.get('/', isLoggedIn, async (req, res) =>{
    //console.log(req.user.id);
    const pedidos = await pool.query('SELECT * FROM (info_pedido INNER JOIN pedido ON info_pedido.id_pedido = pedido.id_ped) INNER JOIN producto ON info_pedido.id_producto = producto.nom_producto WHERE pedido.id_usuario = ?', [req.user.id]);
    //const totales = pool.query('SELECT id_pedido, SUM(valor * cantidad) AS sum FROM (info_pedido INNER JOIN pedido ON info_pedido.id_pedido = pedido.id_ped) INNER JOIN producto ON info_pedido.id_producto = producto.nom_producto WHERE pedido.id_usuario = ? GROUP BY id_pedido', [req.user.id]);
    // renderizar la vista de los pedidos
    res.render('pedidos/list', { pedidos });
});

// async, consulta asincrona para devolver todos los pedidos con su respectiva informacion
router.get('/totals', isLoggedIn, async (req, res) =>{
    const totals = await pool.query(`SELECT id_pedido, SUM(valor * cantidad) AS sum FROM (info_pedido INNER JOIN pedido ON info_pedido.id_pedido = pedido.id_ped) INNER JOIN producto ON info_pedido.id_producto = producto.nom_producto WHERE pedido.id_usuario = ${[req.user.id]} GROUP BY id_pedido`);
    console.log(totals);
    // renderizar la vista de los pedidos
    res.render('pedidos/totals', { totals });
});

// ruta para borrado, borra el id que va seguido en la ruta 'delete'
/* router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM pedidos WHERE id = ?', [id]);
    req.flash('success', 'Link eliminado satisfactoriamente');
    res.redirect('/pedidos');
}); */

// ruta para editar, borra el id que esta concatenado al enlace
/*router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const pedidos = await pool.query('SELECT * FROM pedidos WHERE id = ?', [id]);

    // como me devuelve un arreglo con el objeto , cogemos la posicion 0 que es lo unico que interesa
    res.render('pedidos/edit', {link: pedidos[0]});
}); */

/* router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { title, description, url } = req.body;
    const newLink = {
        title,
        description,
        url
    }
    await pool.query('UPDATE pedidos SET ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Link actualizado satisfactoriamente');
    res.redirect('/pedidos');
}); */

module.exports = router;