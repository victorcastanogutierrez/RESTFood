class DBConnector {

    constructor(app, mongo) {
        this.app = app;
        this.mongo = mongo;
    }

    getConnection(callback) {
        this.mongo.MongoClient.connect(this.app.get('db'), function(err, db) {
			callback(err, db);
		});
    }
}

exports.DBConnector = DBConnector;