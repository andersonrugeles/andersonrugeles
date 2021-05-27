const express = require('express');
const router= express.Router();
const pool=require('../database');
const {estalogueado}=require('../lib/valida');

router.get('/listarp',estalogueado,async(req,res)=>{
    const muestra=await pool.query('select * from producto');
    res.render('administrador/listaproduc',{muestra});

});

router.post('/delete/:idproducto',estalogueado,async(req,res)=>{
    const {idproducto}=req.params;
    await pool.query('delete from producto where idproducto = ?',[idproducto]);
    req.flash('success','Producto eliminado correctamente');
    res.redirect('../listarp');
});

/*router.get('/modificar_producto/:idproducto',async(req,res)=>{
    const {idproducto}=req.params;
    const producto_id =await pool.query('select * from producto where idproducto = ?',[idproducto]);
    res.render('administrador/modificarproduc',{producto_id});
});
*/

router.post('/modificar_producto/:idproducto',estalogueado,async(req,res)=>{
    const {idproducto}=req.params;
    const {nombre,descripcion,precio}=req.body;
    const actualizaproduc={nombre,descripcion,precio};
    const productoact=await pool.query('UPDATE producto set ? where idproducto = ?',[req.body,idproducto]);
    req.flash('success','Producto actualizado correctamente');
    res.redirect('../listarp');
});




   module.exports=router;