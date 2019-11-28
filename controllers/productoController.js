const Productos=require('../models/Productos');
const fs = require('fs')
const multer=require('multer');
const shortid=require('shortid');
const Sequelize = require('sequelize');
const Op = Sequelize.Op; 


const pathUploads=__dirname+'../../uploads';

const configuracionMulter={
    storage: fileStorage =multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,pathUploads);
        },
        filename:(req,file,cb)=>{
            const extension=file.mimetype.split('/')[1];
            cb(null,`${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req,file,cb){
        if(file.mimetype === 'image/jpeg'  || file.mimetype === 'image/png' ){
            cb(null,true);
        }else{
            cb(new Error('Formato no valido'));
        }
    },
}
const upload=multer(configuracionMulter).single('imagen'); 

//Sube un archivo
exports.subirArchivo=(req,res,next)=>{
    upload(req,res,function(error){
        if (error){
            res.status(200).json({error:error});
        }
        return next();
    })
}


exports.nuevoProducto=async (req,res,next)=>{
    
    try {
        if(req.file){           
            req.body.imagen=req.file.filename;
        }
        
        const producto= await Productos.create(req.body);
        return res.status(200).json({
            message:'Se agrego un nuevo producto'
        });
    } catch (error) {
        console.log(error);
        return res.status(200).json({error:error});
    }
};
exports.mostrarProductos=async(req,res,next)=>{
    try {
        const productos=await Productos.findAll();
        return res.status(200).json({productos })
    } catch (error) {
        console.log(error);
        return res.status(200).json({error:error});
    }
};
exports.mostrarProducto =async (req,res,next)=>{
    try {
        const {idProducto}=req.params;
        const producto= await Productos.findOne({
            where :{id:idProducto}
        });
        if(producto){
            return res.status(200).json({producto});
        }
        else{
            return res.status(400).send('No existe producto para ese ID');
        }
    } catch (error) {
        console.log(error);
        return res.status(200).json({error:error});
    }
};
exports.actualizarProducto=async (req,res,next)=>{
    try {
        const {idProducto}=req.params;
        let producto =await Productos.findOne( { where : { id : idProducto }} );

        if(req.file){           
            req.body.imagen=req.file.filename;
            //
            fs.unlink(pathUploads+'/'+producto.imagen, (err) => {
                if (err) {
                  console.error(err)
                  return
                }              
                //file removed
              });           
        }
        
        const [update]= await Productos.update(req.body,{
            where:{id:idProducto}
        });
        if(update){
            const updateProducto =await Productos.findOne( { where : { id : idProducto }} );
            return res.status(200).json({producto:updateProducto});
        }
        throw new Error('Producto no encontrado');
    } catch (error) {
        console.log(error);
        return res.status(200).json({error:error});
    }
};
exports.eliminarProducto=async (req,res,next)=>{
    const {idProducto}=req.params;
    try {
        let producto =await Productos.findOne( { where : { id : idProducto }} );

        if(producto.imagen){                     
            fs.unlink(pathUploads+'/'+producto.imagen, (err) => {
                if (err) {
                  console.error(err)
                  return
                }              
                //file removed
            });           
        }

        const deleted = await Productos.destroy({
            where: { id: idProducto }
          });
          return res.status(200).json({message:'Producto Borrado'});          
    } catch (error) {
        console.log(error);
        return res.status(200).json({error:error});
    }
}

exports.buscarProducto=async (req,res,next)=>{
    
    try {
         //obtener el query
         const {query}=req.params;
         console.log(query);
         const producto= await Productos.findAll({
             where :{
                 nombre:{
                    [Op.substring]: query
                  }
             }
         })
         res.json(producto);
    } catch (error) {
        console.log(error);
        next();
    }
}
exports.autocompleteProducto=async (req,res,next)=>{
    
    try {
         //obtener el query
         //const {query}=req.params;
         //console.log(query);
         const productos= await Productos.findAll({
             attributes:[['id','value'],['nombre','label'],'precio']
            /*  ,where :{
                 nombre:{
                    [Op.substring]: query
                  }
             } */
         })
         res.json(productos);
    } catch (error) {
        console.log(error);
        next();
    }
}

