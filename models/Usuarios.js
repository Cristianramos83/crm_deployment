const Sequelize=require('sequelize');
const db=require('../config/db');

const Usuarios=db.define('usuarios',{
    id: {
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nombre:{
        type:Sequelize.STRING,
        allowNull:false 
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        validate :{
            isEmail:{ msg:'Agrega un correo valido de email' }
        
        },
        unique:{
            args:true,
            msg :'Usuario ya registrado'
        },
    },
    password:{
        type:Sequelize.STRING(60),
        allowNull:false, 
        validate :{
            notEmpty:{
                msg:'El password no puede ir vacio'
            }
        }
    },    
    google:{
        type: Sequelize.BOOLEAN,
        defaultValue:false
    },
    facebook:{
        type: Sequelize.BOOLEAN,
        defaultValue:false
    },
    /* tokenPassword:Sequelize.STRING,
    expiraToken:Sequelize.DATE */
},  {
    hooks:{
        beforeCreate(usuario) {
            usuario.email = usuario.email.toLowerCase();
        },
        beforeUpdate(usuario){
            usuario.email = usuario.email.toLowerCase();
        }
    }
});
module.exports=Usuarios;