const { DBConnector } = require('./dbConnector');

class UserGestorDB extends DBConnector {

    constructor(app, mongo) {
        super(app, mongo);
    }
}

exports.UserGestorDB = UserGestorDB;