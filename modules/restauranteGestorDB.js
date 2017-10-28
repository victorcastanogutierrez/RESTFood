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

    buscarRestaurantesPgCriterios(criterios, pagina, successCallback, errorCallback) {
        this.getConnection((err, db) => {
            if (err) {
                if (errorCallback) {
                    errorCallback(err);
                }
            } else {
                var collection = db.collection("restaurantes");
                collection.count(criterios, function(err, count) {
                    let searchFunction = function(err, result) {
                        if (err) {
                            errorCallback(err);
                        } else {
                            successCallback(result, count);
                        }
                    };

                    if (criterios != null) {
                        collection.find(criterios).skip( (pagina-1)*4 ).limit( 4 ).toArray(searchFunction);
                    } else {
                        collection.find().skip( (pagina-1)*4 ).limit( 4 ).toArray(searchFunction);
                    } 
                });
            }
        });
    }

}

exports.RestauranteGestorDB = RestauranteGestorDB;