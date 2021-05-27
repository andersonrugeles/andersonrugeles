const express = require('express');
const router= express.Router();
const passport=require('passport');
const {noestalogueado}=require('../lib/valida');



router.get('/registra',noestalogueado,(req,res)=>{
   
   res.render('registros/registra');
  
});

router.post('/registra',(req,res,next)=>{
passport.authenticate('local.registra',{
     failureFlash: true,
})(req,res,next);
req.flash('success','Usuario regitrado exitosamente')
res.redirect('../registros/registra');
});
      
router.get('/login',noestalogueado,(req,res)=>{
        res.render('iniciasesion/login');
});

router.post('/login',noestalogueado,(req,res,next)=>{
passport.authenticate('local.inicio',{
    successRedirect: '/sesion',
    failureRedirect: '/iniciasesion/login',
    failureFlash: true
})(req,res,next);
});


module.exports=router;