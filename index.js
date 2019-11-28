const express =require('express');
const routes=require('./routes');
const bodyParser = require('body-parser');
require('dotenv').config({path:'variables.env'});


//Cors permite que un cliente se conecta a otro servidor para el intercambio de recursos
const cors=require('cors');

//Crear la conexion a BD con sequelize y dialecto SqlServer
const db=require('./config/db');




//Modelos de la base de datos
require('./models/Clientes');
require('./models/Productos');
require('./models/Pedidos');
require('./models/Usuarios');
//db.sync({force:true});
 
db.sync()
.then(()=>console.log('Conectando al servidor'))
.catch(error => console.log(error));

const app=express();


//acceso a uploads carpeta publica para el cliente-api
app.use(express.static('uploads'));

//Conexion a Sequelize SqlServer
//habilitar bodyParser para leer datos del formulario
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


//Definir un dominio(s) para recibir las peticiones

const whitelist=[process.env.FRONTEND_URL];

const corsOptions={
        origin:(origin,callback)=>{

            const existe =whitelist.some(dominio=> dominio === origin);
            if (existe){
                callback(null,true);
            }else{
                callback(new Error('No perrmitido por CORS'));
            }
        }
}


//Habilitar cors
app.use(cors(corsOptions));
//Rutas de la app
app.use('/',routes());


//no va a existir en heroku y asignara automaticamente
const host=process.env.HOST || '0.0.0.0';

//existira en heroku y el puerto lo genera automaticamente
const port=process.env.PORT || 5000;

app.listen(port,host,()=>{
    console.log('el servidor esta funcionando');
});