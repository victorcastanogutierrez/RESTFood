const { DBConnector } = require("./dbConnector");

class PedidoGestorDB extends DBConnector {
    constructor(app, mongo) {
        super(app, mongo);
    }

    insertarPedido(pedido, funcionCallback, errorCallback) {
        this.getConnection((err, db) => {
            console.log("trato de insertar pedido");
            if (err) {
                funcionCallback(null);
            } else {
                let criterio = { _id: this.mongo.ObjectID(pedido.idRes) };

                let restaurantes = db.collection("restaurantes");
                let pedidos = db.collection("pedidos");

                restaurantes.find(criterio).toArray(function(err, restaurantes) {
                    if (err) {
                        errorCallback(null);
                    } else {

                        let restaurante = restaurantes[0];
                        let precio = 0;
                        let productosPedidos = [];
                        pedido.idsPlatos.forEach((id) => {
                            precio += Number(restaurante.menu[id].precio);
                            productosPedidos.push(restaurante.menu[id])
                        });

                        let pedidoFinal = {
                            precio: precio,
                            restaurante: restaurante.nombre,
                            propietario: pedido.propietario,
                            productos: productosPedidos,
                            hora: pedido.hora
                        }
                        pedidos.insert(pedidoFinal, function(err, result) {
                            if (err) {
                                funcionCallback(null);
                            } else {
                                funcionCallback(result.ops[0]._id);
                            }
                            db.close();
                        });

                    }
                });
            }
        });
    }

    listarPedidos(criterio, successCallback, errorCallback) {
        this.getConnection((err, db) => {
            if (err) {
                if (errorCallback) {
                    errorCallback(err);
                }
            }
            let collection = db.collection('pedidos');
            collection.find(criterio).toArray(function(err, pedidos) {
                if (err) {
                    errorCallback(null);
                } else {
                    pedidos.map(x => x.hora = new Date(x.hora));
                    successCallback(pedidos);
                }
                db.close();
            });
        });
    }
}

exports.PedidoGestorDB = PedidoGestorDB;