module.exports = function(app, swig, gestorDBUsuarios, restauranteGestorDB, pedidosGestorDB) {
    app.get("/p/pedido/:id", function(req, res) {
        let criterio = {
            _id: restauranteGestorDB.mongo.ObjectID(req.params.id)
        };

        restauranteGestorDB.listarRestaurantes(criterio, restaurantes => {
            var respuesta = swig.renderFile("views/vista_pedido.html", { restaurante: restaurantes[0] });
            res.send(respuesta);
        });
    });


    app.post("/p/pedido", function(req, res) {

        let pedido = req.body.pedido;
        console.log(pedio);



    });


};