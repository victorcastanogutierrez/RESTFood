module.exports = function(app, swig, gestorDBUsuarios, restauranteGestorDB) {

    app.get("/restaurante", function(req, res) {
        var respuesta = swig.renderFile('views/vista_restaurante.html', {});
        res.send(respuesta);
    });


    app.post("/p/restaurante", function(req, res) {
        let restaurante = req.body;
        restauranteGestorDB.insertarRestaurante(restaurante, (id) => {
            res.redirect("/views/vista_home.html");
        })
    });

    app.get("/p/crearrestaurante", function(req, res) {
        var respuesta = swig.renderFile('views/crear_restaurante.html', {});
        res.send(respuesta);
    });

    app.get("/home", function(req, res) {
        let restaurantes = [];

        restauranteGestorDB.buscarRestaurantes(result => {
            var respuesta = swig.renderFile('views/vista_home.html', { restaurantes: result });
            res.send(respuesta);
        });
    });

}