module.exports = function(app, swig, gestorDBUsuarios, restauranteGestorDB, pedidosGestorDB, ObjectID, gestorMail) {
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
            gestorMail.sendMail(req.session.usuario, "Pedido en camino", "Hemos registrado tu pedido. En breve lo tendrás en casa. ¡Que aproveche!");
            res.sendStatus(200);
        })
    });

    app.get("/p/mispedidos", function(req, res) {
        let criterio = {
            propietario: req.session.usuario
        };
        pedidosGestorDB.findAll('pedidos', criterio, (pedidos) => {
            pedidos.map(x =>  {
                x.hora = new Date(x.hora);
                x.elapsedTime = getElapsedTime(x.hora);
            });
            
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

    app.post("/p/repetir", function(req, res) {
        const pid = new ObjectID(req.body.idPedido)
        pedidosGestorDB.clonarPedido(pid, (err) => {
            if (err) {
                console.log(err);
            } else {
                gestorMail.sendMail(req.session.usuario, "Pedido en camino", "¿Repites? ¡Buena elección! En breve lo tendrás en casa. ¡Que aproveche!");
                res.redirect("/p/mispedidos" +
                    "?mensaje=¡No te arrepentirás de repetir, pedido en camino!" +
                    "&tipoMensaje=alert-success");
            }
        });
    });

    app.get("/p/misvaloraciones", function(req, res) {
        let criterio = {
            propietario: req.session.usuario
        };
        pedidosGestorDB.findAll('pedidos', criterio, (pedidos) => {
            let valoraciones = [];
            const pedidosSend = pedidos.filter(x => x.valoracion);
            const sinValorar = pedidos.length - pedidosSend.length;
            var respuesta = swig.renderFile('views/mis_valoraciones.html', { 
                pedidos: pedidosSend,
                sinValorar: sinValorar 
            });
            res.send(respuesta);
        });
    });
};

function dayOfYear(fecha) {
    var start = new Date(fecha.getFullYear(), 0, 0);
    var diff = fecha - start;
    var oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

function getElapsedTime(tiempo) {
    const actual = new Date();
    let result = "Hace ";
    const daysDiff = dayOfYear(actual) - dayOfYear(tiempo);

    if (actual.getFullYear() != tiempo.getFullYear()) {
        let anios = actual.getFullYear() - tiempo.getFullYear();
        result += anios + " año" + (anios > 1 ? "s" : "") + ", ";
    }
    if (daysDiff == 0) {
        if (actual.getHours() == tiempo.getHours()) {
            if (actual.getMinutes() == tiempo.getMinutes()) {
                result += (actual.getSeconds() - tiempo.getSeconds()) + " segundos";
            } else {
                result += (actual.getMinutes() - tiempo.getMinutes()) + " minutos";
            }
        } else {
            result += (actual.getHours() - tiempo.getHours()) + " horas";
        }
    } else if (daysDiff > 0 && daysDiff <= 31) {
        result += daysDiff + " dias";
    } else if (daysDiff <= 365) {
        result += (Math.round(daysDiff / 31) + " meses y " + (daysDiff % 31) + " días");
    } else {
        result += "más de " + Math.round(daysDiff / 31) + " años";
    }
    
    
    return result;
}