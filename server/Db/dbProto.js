const mongod = require('mongodb'); 
const mongo = mongod.MongoClient;

function dbConn(collectionName)  {
    this.URL = "mongodb://localhost:27017/lamed";
    this.collection = collectionName;
}

// Adds a new object to the DB and calls the callback with the added object
dbConn.prototype.addNewObject = function(objectToAdd, callback) {
    mongo.connect(this.URL, (err, db) => {
        if (err) {
            throw err;
        }

        db.collection(this.collection).insertOne(objectToAdd, function(err,res) {
            if (err) throw err;
            callback(res.ops[0]);
            db.close();
        });
    });
}

 /**
  * Finds a specific items in the collection
  * @param {Json} query The query to find the needed items
  * @param {fn} callback The callback that will manipulate the items found
  */
dbConn.prototype.getSpecific = function(query, callback) {
    mongo.connect(this.URL, (err, db) => {
        if (err) {
            throw err;
        }

        db.collection(this.collection).find(query).toArray((err, result) => {
            if (err) {
                throw err;
            }

            callback(result);
            db.close();
        });
    });
}

/**
 * Gets the specific item with the given id
 * @param {string} id The id of the wanted item
 * @param {fn} callback The callback that manipulates the given item
 */
dbConn.prototype.getById = function(id, callback) {
    mongo.connect(this.URL, (err, db) => {
        if (err) {
            throw err;
        }

        db.collection(this.collection).findOne({_id: new mongod.ObjectID(id)}, (err, result) => {
            if (err) {
                throw err;
            }

            callback(result);
            db.close();
        });
    });
}

/**
 * Finds all the items in the collection
 * @param {fn} callback The callback that manipualtes the data
 */
dbConn.prototype.getAll= function(callback) {
    this.getSpecific({}, callback);
}

/**
 * Remove the given object from the 
 * @param {string} objId Id of the object to remove
 * @param {fn} callback Returns the id of the deleted object
 */
dbConn.prototype.removeObject = function(objId, callback) {
    mongo.connect(this.URL, (err, db) => {
        if (err) {
            throw err;
        }

        db.collection(this.collection).remove({_id: new mongod.ObjectID(objId)}, function(err,res) {
            if (err) throw err;
            callback({id: objId});
            db.close();
        });
    });
}

/**
 * Updates a given object
 * @param {string} objId Id of the object ot update
 * @param {json} whatToUpdate The updates wanted in a fokrm of json
 * @param {fn} callback Returns the id of the updated object
 */
dbConn.prototype.updateObject = function(objId, whatToUpdate, callback) {
    mongo.connect(this.URL, (err, db) => {
        if (err) {
            throw err;
        }

        db.collection(this.collection).update({_id: new mongod.ObjectID(objId)}, {$set: whatToUpdate}, function(err,res) {
            if (err) throw err;
            callback({id:objId});
            db.close();
        });
    });
}

module.exports = dbConn;