const Sequelize = require('sequelize');
const db = require('../config/db');

const Productos=db.define('productos',{
    id: {
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nombre:{
        type:Sequelize.STRING,
        allowNull:false
    },
    precio:{
        type:Sequelize.DECIMAL(10, 2),
        allowNull:false        
    },
    imagen:Sequelize.STRING
});
module.exports=Productos;