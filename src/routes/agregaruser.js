const express = require('express');
const router= express.Router();
const passport=require('passport');


router.get('/agregaruser',(req,res)=>{
    res.render('administrador/adduser');
   });


   router.post('/agregaruser',(req,res,next)=>{
    passport.authenticate('local.registro',{
         failureFlash: true,
    })(req,res,next);
    req.flash('success','Usuario regitrado exitosamente')
    res.redirect('../agregaruser');
    });


module.exports=router;