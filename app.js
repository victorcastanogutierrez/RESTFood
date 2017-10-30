//Constantes
const usuarioEmail = "emailpoonode@gmail.com";
const passwordEmail = "emailpoo";

//Requires
var express = require("express");
var app = express();
var expressSession = require("express-session");
var mongo = require("mongodb");
var swig = require("swig");
var bodyParser = require("body-parser");
var crypto = require("crypto");
var nodemailer = require('nodemailer');

//DB
app.set('port', process.env.PORT || 8081);
app.set("db", "mongodb://admin:UDKbzgrue5Zp@ds163034.mlab.com:63034/restfood");
var { UserGestorDB } = require("./modules/userGestorDB.js");
const userGestorDB = new UserGestorDB(app, mongo);
var { RestauranteGestorDB } = require("./modules/restauranteGestorDB.js");
const restauranteGestorDB = new RestauranteGestorDB(app, mongo);
var { PedidoGestorDB } = require("./modules/pedidosGestorDB.js");
const pedidoGestorDB = new PedidoGestorDB(app, mongo);
var { GestorMail } = require("./modules/gestorMail.js");

app.use(
    expressSession({
        secret: "abcdefg",
        resave: true,
        saveUninitialized: true
    })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

//Router
require("./routes/router.js")(app, express, swig);

//Rutas
require("./routes/rusuarios.js")(app, swig, userGestorDB);
require("./routes/rrestaurantes.js")(
    app,
    swig,
    userGestorDB,
    restauranteGestorDB
);

//Mailvars
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: usuarioEmail,
        pass: passwordEmail
    }
});
const gestor = new GestorMail(transporter);

require("./routes/rpedidos.js")(app, swig, userGestorDB, restauranteGestorDB, pedidoGestorDB, mongo.ObjectID, gestor);

//Variables
app.set("clave", "supersegura");
app.set("crypto", crypto);

app.get("/", function(req, res) {
    res.redirect("/home");
});

app.use(function(err, req, res, next) {
    console.log("Error producido: " + err); //we log the error in our db
    if (!res.headersSent) {
        res.status(400);
        res.send("Recurso no disponible");
    }
});

app.use(function (req, res, next) {
    //CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, data-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// lanzar el servidor
app.listen(app.get("port"), function() {
    console.log("Servidor activo");
});