const express = require('express');
const router= express.Router();
const pool=require('../database');
const {estalogueado}=require('../lib/valida');

router.get('/agrega',(req,res)=>{
    res.render('administrador/addproduc');
   });


router.post('/agrega',async(req,res)=>{
   const {nombre,descripcion,precio,url1}=req.body;
   const agregar={nombre,descripcion,precio,url1};
   const result=await pool.query('insert into producto set ?',[agregar]);
   req.flash('success','Producto agregado exitosamente');
   res.redirect('../agrega');
});

module.exports=router;