const express= require('express');

const router= express.Router();

const clienteController=require('../controllers/clienteController');
const productoController=require('..//controllers/productoController');
const pedidosController=require('..//controllers/pedidoController');
const usuariosController =require('..//controllers/usuarioController');

//middle para proteger las rutas

const auth=require('../middleware/auth');

module.exports =function(){
    
    //**CLIENTES* */
   //Agregar nuevos clientes via post
   router.post('/clientes',
   auth,
   clienteController.nuevoCliente);
   //Obtener todos los clientes
   router.get('/clientes',
   auth,
   clienteController.mostrarClientes);

   //Muestra un cliente especifico por ID
   router.get('/clientes/:idCliente',
   auth,
   clienteController.mostrarCliente);

    //Actualizar Cliente
    router.put('/clientes/:idCliente',
    auth,
    clienteController.actualizarCliente);

    //Eliminar Cliente
    router.delete('/clientes/:idCliente',
    auth,
    clienteController.eliminarCliente);
    
    router.post('/clientes/autocomplete',clienteController.autocompleteCliente);


    //**PRODUCTOS */

    //Agregar nuevos productos via post
    router.post('/productos',
    auth,
    productoController.subirArchivo,
    productoController.nuevoProducto);
    
    //Muestra todos los productos
    router.get('/productos',
    auth,
    productoController.mostrarProductos);


    //Muestra un producto
    router.get('/productos/:idProducto',
    auth,
    productoController.mostrarProducto);

    //Actualizar un producto
    router.put('/productos/:idProducto',
    auth,
    productoController.subirArchivo,
    productoController.actualizarProducto);

    //Eliminar un producto
    router.delete('/productos/:idProducto',
    auth,
    productoController.eliminarProducto);


    router.post('/productos/busqueda/:query',productoController.buscarProducto);

    router.post('/productos/autocomplete',productoController.autocompleteProducto);

    /***PEDIDOS */
    //Crear un pedido
    router.post('/pedidos',
    auth,
    pedidosController.nuevoPedido);
    
    //Mostrar todos los pedidos
    router.get('/pedidos',
    auth,
    pedidosController.mostrarPedidos);

    //Muestra un pedido especifico por numero pedido
    router.get('/pedidos/:numeroPedido',
    auth,
    pedidosController.mostrarDetallePedido);

    router.post('/pedidos/maxnumero',pedidosController.maxNumeroPedido);
    //Eliminar un producto
    router.put('/pedidos/:idPedido',
    auth,
    pedidosController.actualizarPedido);


    //Eliminar un producto
    router.delete('/pedidos/:numeroPedido',
    auth,
    pedidosController.eliminarPedido);


    //Usuarios

    router.post('/crear-cuenta',
    //auth,
    usuariosController.registrarUsuario    
    );
    
    router.post('/iniciar-sesion',
    usuariosController.autenticarUsuario
    );

    return router;
}


 /* router.get('/',(req,res)=>{
        res.send('inicio')
    });
    router.get('/nosotros',(req,res)=>{
        res.send('nosotros');
    }); */