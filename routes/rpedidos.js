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

        let pedido = req.body;

        pedido.propietario = req.session.usuario;

        pedidosGestorDB.insertarPedido(pedido, () => {
            res.sendStatus(200);
        })
    });
    
    app.get("/p/mispedidos", function(req, res) {
        let criterio = {
            propietario: req.session.usuario
        };
        pedidosGestorDB.findAll('pedidos', criterio, (pedidos) => {
            pedidos.map(x => x.hora = new Date(x.hora));
            var respuesta = swig.renderFile('views/mis_pedidos.html', { pedidos: pedidos });
            res.send(respuesta);
        })
    });
};