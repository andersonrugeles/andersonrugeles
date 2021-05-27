const express = require('express');
const router= express.Router();
const pool=require('../database');
const {estalogueado}=require('../lib/valida');

router.get('/listaru',estalogueado,async(req,res)=>{
    const muestrausers=await pool.query('select * from registro');
    res.render('administrador/listausers',{muestrausers});

});

router.post('/delete-usuario/:idcliente',estalogueado,async(req,res)=>{
    const {idcliente}=req.params;
    await pool.query('delete from registro where idcliente = ?',[idcliente]);
    req.flash('success','Usuario eliminado correctamente');
    res.redirect('../listaru');
});
/*
router.get('/modificar_usuario/:idcliente',async(req,res)=>{
    const {idcliente}=req.params;
    const usuario_id =await pool.query('select * from registro where idcliente = ?',[idcliente]);
    res.render('administrador/modificaruser',{usuario_id});
});
*/
router.post('/modificar_usuario/:idcliente',estalogueado,async(req,res)=>{
    const {idcliente}=req.params;
    const {nombre,username,correo}=req.body;
    const actualizausuario={nombre,username,correo};
    await pool.query('update registro set ? where idcliente = ?',[req.body,idcliente]);
    req.flash('success','Usuario actualizado correctamente');
    res.redirect('../listaru');
});




   module.exports=router;