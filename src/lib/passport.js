const passport = require('passport');
const LocalStrategy= require('passport-local').Strategy;
const pool=require('../database');
const helpers=require('../lib/helpers');

passport.use('local.inicio',new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
        },async(req,username,password,done) => {
          const rows=await pool.query('SELECT *  FROM registro WHERE username = ?', [username]);
          if(rows.length>0){
          const user=rows[0];
          const validacion=await helpers.matchPassword(password, user.password);
          
          if(validacion){
                 if(user.roles_idroles == 1){
                     const admin=true;
                     done(null,user,admin,req.flash('success','Bienvenido'));
                    
                 }else{
                    done(null,user,req.flash('success','Bienvenido'));
                  }
          }else{
              done(null,false,req.flash('message','Contraseña Incorrecta'));
          }
        }else{
            return done(null,false,req.flash('message','Usuario no existe'));
        }
    }));


passport.use('local.registra',new LocalStrategy({
usernameField: 'username',
passwordField: 'password',
passReqToCallback: true
}, async(req,username,password,done) => {
    const {nombre,correo}=req.body;
    const registrar={nombre,username,correo,password};
    registrar.password = await helpers.encryptPassword(password);
    const result=await pool.query('insert into registro set ?',[registrar]);
    registrar.idcliente=result.insertId;
     return done(null,registrar);
}));

passport.use('local.registro',new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
    }, async(req,username,password,done) => {
        const {nombre,correo}=req.body;
        const registrar={nombre,username,correo,password};
        registrar.password = await helpers.encryptPassword(password);
        const result=await pool.query('insert into registro set ?',[registrar]);
        registrar.idcliente=result.insertId;
         return done(null,registrar);
    }));

passport.serializeUser(async(user,done)=>{
    if(user.roles_idroles == 1){
              
        done(null,user.idcliente);
    }else{
        done(null,user.idcliente);
    }
});

passport.deserializeUser(async(idcliente,done)=>{
 const rows= await pool.query(' SELECT * FROM registro where idcliente = ?',[idcliente]);
done(null,rows[0]);
});