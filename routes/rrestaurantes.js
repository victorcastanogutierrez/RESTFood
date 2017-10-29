module.exports = function(app, swig, gestorDBUsuarios, restauranteGestorDB) {

    app.get("/p/misrestaurantes", function(req, res) {
        let criterio = {
            propietario: req.session.usuario
        };
        restauranteGestorDB.findAll('restaurantes', criterio, restaurantes => {
            var respuesta = swig.renderFile("views/mis_restaurantes.html", {
                restaurantes: restaurantes
            });
            res.send(respuesta);
        });
    });

    app.get("/p/restaurante/eliminar/:id", function(req, res) {
        let criterio = {
            _id: restauranteGestorDB.mongo.ObjectID(req.params.id)
        };
        restauranteGestorDB.borrarRestaurante(criterio, response => {
            res.redirect("/p/misrestaurantes");
        });
    });

    app.get("/p/restaurante/modificar/:id", function(req, res) {
        let criterio = {
            _id: restauranteGestorDB.mongo.ObjectID(req.params.id)
        };
        restauranteGestorDB.buscarRestaurantesPgCriterios(criterio, restaurantes => {
            var respuesta = swig.renderFile("views/modificar_menu.html", { restaurante: restaurantes[0] });
            res.send(respuesta);
        });
    });

    app.post("/p/restaurante", function(req, res) {
        let restaurante = req.body;
        restaurante.propietario = req.session.usuario;
        restauranteGestorDB.insertarRestaurante(restaurante, (id) => {
            res.redirect("/p/misrestaurantes");
        }, err => res.sendStatus(400, {}));
    });

    app.post("/p/modifyrestaurant", function(req, res) {
        let restaurante = req.body;
        restauranteGestorDB.modificarRestaurante(restaurante, (id) => {
            res.redirect("/p/misrestaurantes");
        }, err => res.sendStatus(400, {}));
    });



    app.get("/p/crearrestaurante", function(req, res) {
        var respuesta = swig.renderFile("views/crear_restaurante.html", {});
        res.send(respuesta);
    });

    app.get("/home", function(req, res, pag) {
        let restaurantes = [];

        var pg = parseInt(req.query.pg); // Es String !!!
        if (req.query.pg == null) { // Puede no venir el param
            pg = 1;
        }

        let criterios = null;
        const busqueda = req.query.busqueda;
        const param = req.query.param;
        const nombreAvanzado = req.query.nombreAvanzada;
        const webAvanzado = req.query.webAvanzada;
        if (busqueda && param) {
            // En caso de que la búsqueda sea al darle al botón buscar
            // automáticamente pasa a 1. En caso de que esté paginando
            // con una búsqueda ya realizada, no le devolvemos a la página 1
            if (!req.query.reset) {
                pg = 1;
            }
            criterios = {};
            criterios[param] = busqueda;
        } else if (nombreAvanzado && webAvanzado) { // Si no es búsqueda simple puede ser avanzada
            criterios = {
                "$or": [{
                    "nombre": nombreAvanzado
                }, {
                    "web": webAvanzado
                }]
            }
        }

        restauranteGestorDB.buscarRestaurantesPgCriterios(criterios, (result, num) => {

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

            const logged = !(req.session.usuario);
            const resp = {
                restaurantes: result,
                pag: pg,
                paginas: paginas,
                busquedaValor: busqueda,
                paramValor: param,
                logged: logged,
                nombreAv: nombreAvanzado,
                webAv: webAvanzado
            };
            
            var respuesta = swig.renderFile('views/vista_home.html', resp);
            res.send(respuesta);
        }, () => {
            //TODO mensajes error
            console.log("error");
        }, pg);

    });
};