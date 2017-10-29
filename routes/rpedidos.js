module.exports = function(app, swig, gestorDBUsuarios, restauranteGestorDB, pedidosGestorDB, ObjectID) {
    app.get("/p/pedido/:id", function(req, res) {
        let criterio = {
            _id: restauranteGestorDB.mongo.ObjectID(req.params.id)
        };

        restauranteGestorDB.findAll('restaurantes', criterio, restaurantes => {
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
            let ops = [];
            for (let i = 1 ; i <= 10; i++) {
                ops.push(i);
            }
            var respuesta = swig.renderFile('views/mis_pedidos.html', { 
                pedidos: pedidos, opciones: ops 
            });
            res.send(respuesta);
        })
    });

    app.post("/p/valorar", function(req, res) {
        const criterios = {
            "_id": new ObjectID(req.body.idPedido)
        };
        pedidosGestorDB.findAll('pedidos', criterios, result => {
            if (result && result.length > 0) {
                const valoracionObj = {
                    valoracionText: req.body.valoracionDes,
                    valoracionNota: req.body.valoracionNota
                }
                result[0].valoracion = valoracionObj;
                pedidosGestorDB.updatePedido(criterios, result[0], () => {
                    res.redirect("/p/mispedidos" +
                        "?mensaje=¡Pedido valorado con éxito!" +
                        "&tipoMensaje=alert-success");
                });
            }
        });
    });
};