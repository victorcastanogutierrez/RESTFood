//Requires
var express = require('express');
var app = express();
var expressSession = require('express-session');
var mongo = require('mongodb');
var swig  = require('swig');
var bodyParser = require('body-parser');
var crypto = require('crypto');

//DB
var { UserGestorDB } = require('./modules/userGestorDB.js');
const userGestorDB = new UserGestorDB(app, mongo);

app.use(expressSession({
    secret: 'abcdefg',
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

//Rutas
require("./routes/rusuarios.js")(app,swig, userGestorDB); 

//Variables
app.set('port', 8081);
app.set('db','mongodb://localhost:27017/restfood');
app.set('clave','supersegura');
app.set('crypto',crypto);

// lanzar el servidor
app.listen(app.get('port'), function() {
	console.log("Servidor activo");
})