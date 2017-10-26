const { DBConnector } = require("./dbConnector");

class UserGestorDB extends DBConnector {
    constructor(app, mongo) {
        super(app, mongo);
    }

    insertarUsuario(usuario, funcionCallback) {
        this.getConnection((err, db) => {
            console.log("trato de insertarlo");
            if (err) {
                funcionCallback(null);
            } else {
                var collection = db.collection("usuarios");
                collection.insert(usuario, function(err, result) {
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

    obtenerUsuarios(criterio, funcionCallback) {
        this.getConnection((err, db) => {

            if (err) {
                funcionCallback(null);
            } else {
                var collection = db.collection("usuarios");
                collection.find(criterio).toArray(function(err, usuarios) {
                    if (err) {
                        funcionCallback(null);
                    } else {
                        funcionCallback(usuarios);
                    }
                    db.close();
                });
            }
        });
    }
}

exports.UserGestorDB = UserGestorDB;