const { DBConnector } = require("./dbConnector");

class RestauranteGestorDB extends DBConnector {
    constructor(app, mongo) {
        super(app, mongo);
    }

    insertarRestaurante(restaurante, funcionCallback, errCallback) {
        this.getConnection((err, db) => {
            if (err) {
                funcionCallback(null);
            } else {
                var collection = db.collection("restaurantes");
                collection.insert(restaurante, function(err, result) {
                    if (err) {
                        errCallback();
                    } else {
                        funcionCallback(result.ops[0]._id);
                    }
                    db.close();
                });
            }
        });
    }

    borrarRestaurante(criterio, successCallback, errorCallback) {
        this.getConnection((err, db) => {
            if (err) {
                if (errorCallback) {
                    errorCallback(err);
                }
            } else {
                let collection = db.collection('restaurantes');
                collection.remove(criterio, function(err, result) {
                    if (err) {
                        errorCallback(null);
                    } else {
                        successCallback(result);
                    }
                    db.close();
                });
            }
        });

    }

    modificarRestaurante(restauranteMod, successCallback, errorCallback) {
        this.getConnection((err, db) => {
            if (err) {
                if (errorCallback) {
                    errorCallback(err);
                }
            } else {
                let criterio = { "_id": this.mongo.ObjectID(restauranteMod.id) }
                let collection = db.collection('restaurantes');
                collection.find(criterio).toArray(function(err, restaurantes) {
                    if (err) {
                        errorCallback(null);
                    } else {
                        let restaurante = restaurantes[0];
                        restaurante.menu = restauranteMod.menu;
                        collection.update(criterio, restaurante, (err, rest) => {
                            if (err)
                                errorCallback(null)
                            else
                                successCallback(rest);
                        })
                    }
                    db.close();
                });
            }
        });

    }

    buscarRestaurantesPgCriterios(criterios, successCallback, errorCallback, pagina) {
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

                    if (!pagina) {
                        collection.find(criterios).toArray(searchFunction);
                    } else {
                        if (criterios != null) {
                            collection.find(criterios).sort({nombre: 1}).skip((pagina - 1) * 4).limit(4).toArray(searchFunction);
                        } else {
                            collection.find().sort({nombre: 1}).skip((pagina - 1) * 4).limit(4).toArray(searchFunction);
                        }
                    }
                });
            }
        });
    }

}

exports.RestauranteGestorDB = RestauranteGestorDB;