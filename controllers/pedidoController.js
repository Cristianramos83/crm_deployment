const Pedidos= require('../models/Pedidos');
const Clientes= require('../models/Clientes');
const Productos= require('../models/Productos');
const Sequelize = require('sequelize');
exports.nuevoPedido=async (req,res,next)=>{

    try {    
       
    const pedido= await Pedidos.create(req.body);
      
    return res.status(200).json({
        message:'Se registro con exito el pedido',
    });
    } catch (error) {
        return res.status(500).json({error: error})
    }
};
exports.mostrarPedidos=async (req,res,next)=>{
    try {
      const pedidos = await Pedidos.findAll({
        attributes: [
          [Sequelize.fn('DISTINCT', Sequelize.col('numero')), 'numero'],
          [Sequelize.fn('sum', Sequelize.col('total')), 'total']       
        ],
        order:[
          ['numero', 'ASC']
        ],
        group:[
          ['numero']
        ]    
      });
      return res.status(200).json({ pedidos });
    } catch (error) {
      console.log(error);
      return res.status(500).json({error: error.message})
    }
  }
  exports.mostrarDetallePedido=async (req,res,next)=>{
    try {
      const { numeroPedido } = req.params;
      const pedido = await Pedidos.findAll({
        where: { numero: numeroPedido },
        attributes: ['cantidad', 'total','id'],
        include: [
             {model:Clientes, attributes:['nombre']},
             {model:Productos, attributes:['nombre','precio']},
        ]
      });
      if (pedido) {
        return res.status(200).json({ pedido });
      }
      return res.status(404).send('No existe ese pedido para ese ID');
    } catch (error) {
      console.log(error);
      return res.status(500).json({error: error.message})
    }
  } 





  exports.actualizarPedido=async (req,res,next)=>{

    try {
        const {idPedido}=req.params;
        const producto= await Productos.findOne({
            where :{id:req.body.productoId}
        });
        req.body.total=producto.precio * req.body.cantidad;   
       
        const [update]= await Pedidos.update(req.body,{
            where:{ id : idPedido }
        });
        if(update){
            const updatePedido =await Pedidos.findOne( { where : { id : idPedido }} );
            return res.status(200).json({pedido:updatePedido});
        }
        throw new Error('Pedido no encontrado');
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:error.message});
    }
};

  exports.eliminarPedido=async (req,res,next)=>{
    const {numeroPedido}=req.params;
    try {
        const deleted = await Pedidos.destroy({
            where: { numero: numeroPedido }
          });
          return res.status(200).json({message:'Pedido Borrado'});          
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:error.message});
    }
}
exports.maxNumeroPedido=async (req,res,next)=>{  
  try {
      let maximo = await Pedidos.max('numero');   
      if(!maximo)
         maximo=0;
        return res.status(200).json({maximo});          
  } catch (error) {
      console.log(error);
      return res.status(500).json({error:error.message});
  }
}