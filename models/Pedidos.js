const Sequelize = require('sequelize');
const db = require('../config/db');

const Productos=require('./Productos');
const Clientes=require('./Clientes');


const Pedidos=db.define('pedidos',{
    id: {
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    numero:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    cantidad:{
        type:Sequelize.INTEGER,
        allowNull:false   
    },total:{
        type:Sequelize.DECIMAL(10,2),
        allowNull:false
    }
});                                                         //  onDelete:'CASCADE'                      
Pedidos.belongsTo(Productos, { foreignKey: { allowNull: false } });
Pedidos.belongsTo(Clientes, { foreignKey: { allowNull: false }});
module.exports=Pedidos;