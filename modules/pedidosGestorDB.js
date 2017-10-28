const { DBConnector } = require("./dbConnector");

class PedidoGestorDB extends DBConnector {
    constructor(app, mongo) {
        super(app, mongo);
    }



}

exports.RestauranteGestorDB = RestauranteGestorDB;