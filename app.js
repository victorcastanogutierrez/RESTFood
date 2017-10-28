//Requires
var express = require("express");
var app = express();
var expressSession = require("express-session");
var mongo = require("mongodb");
var swig = require("swig");
var bodyParser = require("body-parser");
var crypto = require("crypto");

//DB
app.set("port", 8081);
app.set("db", "mongodb://admin:UDKbzgrue5Zp@ds163034.mlab.com:63034/restfood");
var { UserGestorDB } = require("./modules/userGestorDB.js");
const userGestorDB = new UserGestorDB(app, mongo);
var { RestauranteGestorDB } = require("./modules/restauranteGestorDB.js");
const restauranteGestorDB = new RestauranteGestorDB(app, mongo);
var { PedidoGestorDB } = require("./modules/pedidosGestorDB.js");
const pedidoGestorDB = new PedidoGestorDB(app, mongo);

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
require("./routes/rpedidos.js")(app, swig, userGestorDB, pedidoGestorDB);

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

// lanzar el servidor
app.listen(app.get("port"), function() {
    console.log("Servidor activo");
});