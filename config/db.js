const Sequelize =require('sequelize');
//extrar valores de variables.env
require('dotenv').config({path:'variables.env'});

const db =new Sequelize(
    process.env.BD_NOMBRE,
    process.env.BD_USER,
    process.env.BD_PASS,
    {
        host:process.env.BD_HOST,
        dialect:'mysql',
        port:process.env.BD_PORT,
        operatorsAliases:false,
        define:{
            timestamps:false
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);


//Para SqlServer
/* const db=new Sequelize('SistemaCrm', 'sa', 'sasa', {
    host: 'LAPTOP-KU6MKIVE',
    dialect: 'mssql',   
    dialectOptions: {
        options: {
            useUTC: false,
            dateFirst: 1,
        }
    }
}); */
module.exports = db;
// Option 2: Passing a connection URI produccion
//const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');