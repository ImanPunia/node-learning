exports.insertDocument = (db, document, collection,  callback) => {

    const coll=  db.collection(collection);

    coll.insertOne(document, (err, res) => {
        callback(res);
    })
};

exports.findDocuments = (db, collection,  callback) => {

    const coll=  db.collection(collection);

    coll.find({}).toArray((err, res) => {
        callback(res);
    });
};

exports.removeDocument =  (db, document, collection, callback) => {

    const coll=  db.collection(collection);

    coll.deleteOne(document,  (err, res) => {
        callback(res);
    })
};

exports.updateDocument = (db,  document,  update , collection ,  callback ) => {

    const coll=  db.collection(collection);

    coll.updateOne(document, {$set: update} , null  ,  (err, res) => {
        callback(res);
    })
};