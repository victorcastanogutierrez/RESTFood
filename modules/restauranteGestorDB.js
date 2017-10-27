const { DBConnector } = require("./dbConnector");

class RestauranteGestorDB extends DBConnector {
    constructor(app, mongo) {
        super(app, mongo);
    }

    insertarRestaurante(restaurante, funcionCallback) {
        this.getConnection((err, db) => {
            console.log("trato de insertar restaurante");
            if (err) {
                funcionCallback(null);
            } else {
                var collection = db.collection("restaurantes");
                collection.insert(restaurante, function(err, result) {
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

}

exports.RestauranteGestorDB = RestauranteGestorDB;