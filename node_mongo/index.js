const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';
const dbOperations =  require('./operations');

MongoClient.connect(url).then(client => {

    console.log('Connected successfully to server');
    const db = client.db(dbname);

    dbOperations.insertDocument(db, {"name":"Iman1", "description": "my second dish"}, 
    'dishes')
    .then((result) => {
        console.log('Insert document:\n', result.acknowledged);

        return dbOperations.findDocuments(db, 'dishes');
    })
    .then((result) => {
        console.log('Found Documents:\n' ,  result);

        return dbOperations.updateDocument(db, {"name":"Iman1"} , {"description": "My 3rd dishes"}, 'dishes');
    })
    .then((result) => {

        console.log('Updated document\n:' + result.modifiedCount);
 
        return dbOperations.findDocuments(db, 'dishes');
    })
    .then((result) => {
        console.log('Found Documents:\n' ,  result);
             
        return db.dropCollection('dishes');
    })
    .then((result) => {
        console.log('Dropped  collection ' + result);

        client.close();
    });
}).catch((err) => {
    console.log(err);
})