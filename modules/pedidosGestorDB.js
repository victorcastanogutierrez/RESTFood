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
                        pedido.idsPlatos.forEach(id => {
                            precio += Number(restaurante.menu[id].precio);
                            productosPedidos.push(restaurante.menu[id]);
                        });
                        let pedidoFinal = {
                            precio: precio,
                            restaurante: restaurante.nombre,
                            propietario: pedido.propietario,
                            productos: productosPedidos,
                            hora: pedido.hora,
                            idRes: pedido.idRes
                        };
                        pedidos.insert(pedidoFinal, (err, result) => {
                            err ? funcionCallback(null) : funcionCallback(result.ops[0]._id);
                            db.close();
                        });
                    }
                });
            }
        });
    }

    updatePedido(criterios, pedido, successCallback, errCallback) {
        this.getConnection((err, db) => {
            if (err) {
                if (errCallback) {
                    errCallback(err);
                }
            } else {
                let pedidos = db.collection("pedidos");
                pedidos.update(criterios, pedido, (err, result) => {
                    successCallback();
                });
            }
        });
    }
}

exports.PedidoGestorDB = PedidoGestorDB;