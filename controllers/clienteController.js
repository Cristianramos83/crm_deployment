const Clientes= require('../models/Clientes');
const Sequelize = require('sequelize');
const Op = Sequelize.Op; 

exports.nuevoCliente= async (req,res,next)=>{    
  
  try {
    const cliente = await Clientes.create(req.body);
    return res.json({
        message:'Se agrego un nuevo cliente'
    });
  } catch (error) {
    return res.json({
      error: error
    })
  }
}
exports.mostrarClientes=async (req,res,next)=>{
  console.log('entre al controller');
  try {
    const clientes = await Clientes.findAll();
    return res.json({ clientes });
  } catch (error) {
    console.log(error);
    return res.json({error: error})
  }
}

exports.mostrarCliente=async (req,res,next)=>{
  try {
    const { idCliente } = req.params;
    const cliente = await Clientes.findOne({
      where: { id: idCliente }
    });
    if (cliente) {
      return res.json({ cliente });
    }
    return res.status(404).send('No existe ese cliente para ese ID');
  } catch (error) {
    console.log(error);
    return res.json({error: error})
  }
} 
exports.actualizarCliente= async (req,res,next)=>{
  
    try {
        const { idCliente } = req.params;
        const [ updated ] = await Clientes.update(req.body, {
          where: { id: idCliente }
        });
        if (updated) {
          const updatedCliente = await Clientes.findOne({ where: { id: idCliente } });
          return res.json({ message: 'Cliente Modificado' });
        }
        throw new Error('Cliente no encontrado');
      } 
      catch (error) {
        console.log(error);
        return res.json({error: error})
      }
}
exports.eliminarCliente= async (req,res,next)=>{
  try {
    const { idCliente } = req.params;
    const deleted = await Clientes.destroy({
      where: { id: idCliente }
    });
    return res.json({message:'Cliente Borrado'});
     
  } catch (error) {
    //console.log(error);
    return res.json({error: error})
  }
};
exports.autocompleteCliente=async (req,res,next)=>{    
  try {
       //obtener el query
       //const {query}=req.params;
       //console.log(query);
       const clientes= await Clientes.findAll({
           attributes:[['id','value'],['nombre','label']]
          /*  ,where :{
               nombre:{
                  [Op.substring]: query
                }
           } */
       })
       res.json(clientes);
  } catch (error) {
      console.log(error);
      next();
  }
}