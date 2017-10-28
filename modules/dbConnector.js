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

    findAll(collectionName, criterio, successCallback, errorCallback) {
        this.getConnection((err, db) => {
            if (err) {
                if (errorCallback) {
                    errorCallback(err);
                }
            }
            let collection = db.collection(collectionName);
            collection.find(criterio).toArray(function(err, result) {
                if (err) {
                    errorCallback(null);
                } else {
                    successCallback(result);
                }
                db.close();
            });
        });
    }
}

exports.DBConnector = DBConnector;