const express = require('express');
const router= express.Router();
const pool=require('../database');
const {estalogueado}=require('../lib/valida');
const formatterPeso = new Intl.NumberFormat('es-CO', {
   style: 'currency',
   currency: 'COP',
   minimumFractionDigits: 0
 })

router.get('/carrito',estalogueado,async(req,res)=>{
    const muestra=await pool.query('select idcarrito,nombre,cantidad,precio,precio*cantidad as totales from carrito where idcliente = ? and idestado=1',[req.user.idcliente]);
    const consultaCantidad=await pool.query('select sum(cantidad) as cantProducto,sum(precio) as precioProducto from carrito where idcliente = ? and idestado=1',[req.user.idcliente]);
    const consultaTotal=await pool.query('select sum(precio*cantidad) as total from carrito where idcliente = ?  and idestado=1',[req.user.idcliente]);
    const cantidad=consultaCantidad[0].cantProducto;
    const precioUnidad=formatterPeso.format(consultaCantidad[0].precioProducto);
    const totalCompra=formatterPeso.format(consultaTotal[0].total);
    res.render('links/carrito',{muestra,cantidad,precioUnidad,totalCompra});
 
 });

 router.post('/delete-carrito/:idcarrito',estalogueado,async(req,res)=>{
    const {idcarrito}=req.params;
    await pool.query('delete from carrito where idcarrito = ?',[idcarrito]);
    res.redirect('../carrito');
 });

 router.post('/comprar',estalogueado,async(req,res)=>{
   const consultaCantidad=await pool.query('select sum(cantidad) as cantProducto,sum(precio) as precioProducto from carrito where idcliente = ? and idestado=1',[req.user.idcliente]);
   const cantidad=consultaCantidad[0].cantProducto;
    if(cantidad == null){
      req.flash('message','Agrega un producto al carrito');
      res.redirect('../links/productos');
   }else{
   const consulta=await pool.query('select idcarrito as identificador from carrito where idcliente = ? and idestado=1',[req.user.idcliente]);
   for (let index = 0; index < consulta.length; index++) {
      const idcarrito=consulta[index].identificador;
      const fecha_compra=new Date();
      const agrega={idcarrito,fecha_compra};
      await pool.query('insert into venta set ?',[agrega]);
   }
   const productoact=await pool.query('UPDATE carrito set idestado=2 where idcliente= ?',[req.user.idcliente]);
   req.flash('success','Compra realizada exitosamente');
   res.redirect('../carrito');
   }
});


module.exports=router;