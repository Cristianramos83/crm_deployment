const Sequelize =require('sequelize');

const db=new Sequelize('SistemaCrm', 'sa', 'sasa', {
    host: 'LAPTOP-KU6MKIVE',
    dialect: 'mssql',   
    dialectOptions: {
        options: {
            useUTC: false,
            dateFirst: 1,
        }
    }
});
module.exports = db;
// Option 2: Passing a connection URI produccion
//const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');