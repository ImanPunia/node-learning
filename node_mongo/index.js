const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) => {

    console.log('Connected successfully to server');
    const db = client.db(dbname);
    const collection= db.collection('dishes');

    collection.insertOne({"name": "Harman" , "description": "my second dish"} , (err, res) => {

        console.log('After insertion');
        console.log(res);

        collection.find({}).toArray((err,docs) => {
            
            console.log('Found:\n');
            console.log(docs);

            db.dropCollection('dishes', (err, result) => {

                client.close();
            });
        })
    });
});