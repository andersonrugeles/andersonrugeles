const express= require('express');
const morgan= require('morgan');
const exphbs= require('express-handlebars');
const path= require('path');
const flash=require('connect-flash');
const session=require('express-session');
const mysqlsession=require('express-mysql-session');
const{database} = require('./keys');
const passport=require('passport');



//inicio
const app= express();
require('./lib/passport');


//configuraciones
app.set('port',process.env.PORT || 4000);
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs',exphbs({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname:'.hbs',
    helpers:require('./lib/handlebars')
}));
app.set('view engine','.hbs');

//peticiones
app.use(session({
secret: 'turelojsession',
resave: false,
saveUninitialized: false,
store: new mysqlsession(database)

}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
//variables globales
app.use((req,res,next)=>{
    app.locals.success=req.flash('success');
    app.locals.message=req.flash('message');
    app.locals.user=req.user;
    next();
});

//rutas
app.use(require('./routes'));
app.use('/registros',require('./routes/authentication'));
app.use('/links',require('./routes/links'));
app.use(require('./routes/cerrar'));
app.use(require('./routes/administrativos'));
app.use('/iniciasesion',require('./routes/authentication'));
app.use(require('./routes/agrega'));
app.use(require('./routes/listarp'));
app.use(require('./routes/listaru'));
app.use(require('./routes/agregaruser'));
app.use(require('./routes/sesion'));
app.use(require('./routes/carrito'));
app.use(require('./routes/compras'));



//public
app.use('/static',express.static(path.join(__dirname,'public')));

//inicia el server
app.listen(app.get('port'),()=>{
    console.log('server on port',app.get('port'))
});