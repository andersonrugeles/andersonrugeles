const express = require('express');
const router= express.Router();


router.get('/cerrarsesion',(req,res)=>{
    req.logOut();
    res.redirect('iniciasesion/login');
});



module.exports=router;