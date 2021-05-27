const express = require('express');
const router= express.Router();
const pool=require('../database');
const {estalogueado}=require('../lib/valida');

router.get('/productos',estalogueado,async(req,res)=>{
   const muestra=await pool.query('select * from producto');
   res.render('links/productos',{muestra});
});



router.post('/productos/:idproducto/:nombre/:precio',estalogueado,async(req,res)=>{
   const {idproducto,nombre,precio}=req.params;
   const {cantidad}=req.body;
   const NewCarro ={idproducto,nombre,precio,cantidad,idcliente:req.user.idcliente};
   const result=await pool.query('insert into carrito set ?',[NewCarro]);
   req.flash('success','Producto agregado al carrito');
   res.redirect('../../../productos');
  
});




module.exports=router;