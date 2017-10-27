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

    buscarRestaurantes(pagina, successCallback, errorCallback) {
        this.getConnection((err, db) => {
            if (err) {
                if (errorCallback) {
                    errorCallback(err);
                }
            } else {
                var collection = db.collection("restaurantes");
                collection.count(function(err, count) {
                    collection.find()
                    .skip( (pagina-1)*4 ).limit( 4 ).toArray(function(err, result) {
                        if (err) {
                            errorCallback(err);
                        } else {
                            successCallback(result, count);
                        }
                    });
                });
            }
        });
    }

}

exports.RestauranteGestorDB = RestauranteGestorDB;