const Usuarios= require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.registrarUsuario=async (req,res)=>{

    //leer los datos del body
    const usuario=req.body;
    usuario.password= await bcrypt.hash(req.body.password,12);
    try {
        await Usuarios.create(usuario);
        res.json({message:'Usuario Creado Correctamente'});
    } catch (error) {
        console.log(error);
        res.json({message:error});
    }
}
exports.autenticarUsuario=async (req,res,next)=>{
    
    const {email,password}=req.body;
    //busco el mail 
    const usuario=await Usuarios.findOne({ where: {email: email} });
    
    //verifico que no exista
    if (!usuario){
        await res.status(401).json({message:'El usuario no existe'});
        next();
    }else{
        //verifico que no se haya autenticado por google o facebook
         if(!bcrypt.compareSync(password,usuario.password)){
             //si el password es incorrecto
            await res.status(401).json({message:'La contraseña es incorrecta'});  
            next();  
        }else{
            //password correcto ,firmar el token
            const token=jwt.sign({
                email:usuario.email,
                nombre:usuario.nombre,
                id:usuario.id                
            },'LLAVESECRETA',
            {
                expiresIn:'6h'
            }); 
            
            //retornar el token
            res.json({token});
        }

        
    }

}