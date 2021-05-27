module.exports={

    estalogueado(req,res,next){
     if(req.isAuthenticated()){
         return next();
     }
     return res.redirect('/registros/registra');
     
    },

    noestalogueado(req,res,next){
        if(!req.isAuthenticated()){
            return next();
        }
        return res.redirect('/index');
    }

     


};