const express = require('express');
const router= express.Router();
const pool=require('../database');
const {estalogueado}=require('../lib/valida');

router.get('/compras',estalogueado,async(req,res)=>{
   const muestra=await pool.query('select c.nombre as nombre,c.cantidad as cantidad, c.precio as precio, v.fecha_compra as fecha from carrito c, venta v where c.idcarrito=v.idcarrito and c.idestado=2 and c.idcliente=?',[req.user.idcliente]);
   res.render('administrador/historial',{muestra});
});

module.exports=router;