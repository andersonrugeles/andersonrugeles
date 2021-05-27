const express = require('express');
const router= express.Router();
const {estalogueado}=require('../lib/valida');

router.get('/admin',estalogueado,(req,res)=>{
  res.render('index/admin');
 });


module.exports=router;