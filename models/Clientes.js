const Sequelize = require('sequelize');
const db = require('../config/db');

const Clientes=db.define('clientes',{
    id: {
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nombre:{
        type:Sequelize.STRING,
        allowNull:false
    },
    apellido:{
        type:Sequelize.STRING,
        allowNull:false
    },
    empresa:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    email: {
		type: Sequelize.STRING,
        allowNull: false,        
        unique:true,
		validate: {
			isEmail: true,
			notEmpty: true,
			len: [1,255]
        },
    },
    telefono:{
        type: Sequelize.STRING
    }
},  {
        hooks:{
            beforeCreate(cliente) {
                cliente.email = cliente.email.toLowerCase();
            },
            beforeUpdate(cliente){
                cliente.email = cliente.email.toLowerCase();
            }
        }
});
module.exports=Clientes;