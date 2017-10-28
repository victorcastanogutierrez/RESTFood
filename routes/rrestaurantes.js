module.exports = function(app, swig, gestorDBUsuarios, restauranteGestorDB) {

    app.get("/pedido/:id", function(req, res) {
        var respuesta = swig.renderFile('views/vista_restaurante.html', {});
        res.send(respuesta);
    });

    app.get("/p/misrestaurantes", function(req, res) {

        let criterio = {
            propietario: req.session.usuario
        };
        restauranteGestorDB.listarRestaurantes(criterio, (restaurantes) => {
            var respuesta = swig.renderFile('views/mis_restaurantes.html', { restaurantes: restaurantes });
            res.send(respuesta);
        })

    });


    app.get("/p/restaurante/eliminar/:id", function(req, res) {
        let criterio = {
            "_id": restauranteGestorDB.mongo.ObjectID(req.params.id)
        }
        restauranteGestorDB.borrarRestaurante(criterio, (response) => {
            res.redirect("/p/misrestaurantes")
        })

    });



    app.post("/p/restaurante", function(req, res) {
        let restaurante = req.body;
        restaurante.propietario = req.session.usuario;
        restauranteGestorDB.insertarRestaurante(restaurante, (id) => {
            res.redirect("/views/vista_home.html");
        })
    });

    app.get("/p/crearrestaurante", function(req, res) {
        var respuesta = swig.renderFile('views/crear_restaurante.html', {});
        res.send(respuesta);
    });

    app.get("/home", function(req, res, pag) {
        let restaurantes = [];

        var pg = parseInt(req.query.pg); // Es String !!!
        if (req.query.pg == null) { // Puede no venir el param
            pg = 1;
        }

        restauranteGestorDB.buscarRestaurantes(pg, (result, num) => {

            let ultimaPg = num / 4;
            if (num % 4 > 0) { // Sobran decimales
                ultimaPg = ultimaPg + 1;
            }

            var paginas = []; // paginas mostrar
            for (var i = pg - 2; i <= pg + 2; i++) {
                if (i > 0 && i <= ultimaPg) {
                    paginas.push(i);
                }
            }

            const resp = {
                restaurantes: result,
                pag: pg,
                paginas: paginas
            };

            var respuesta = swig.renderFile('views/vista_home.html', resp);
            res.send(respuesta);
        });

    });

}