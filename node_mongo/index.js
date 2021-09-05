const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';
const dbOperations =  require('./operations');

MongoClient.connect(url, (err, client) => {

    console.log('Connected successfully to server');
    const db = client.db(dbname);
    const collection= db.collection('dishes');

    console.log(collection);

   dbOperations.insertDocument(db, {"name":"Iman1", "description": "my second dish"}, 'dishes', (result) => {
       console.log('Insert document:\n', result.acknowledged);

       dbOperations.findDocuments(db, 'dishes', (result) => {
           console.log('Found Documents:\n' ,  result);

           dbOperations.updateDocument(db, {"name":"Iman1"} , {"description": "My 3rd dishes"}, 'dishes', (result) => {
               console.log('Updated document\n:' + result.modifiedCount);

               dbOperations.findDocuments(db, 'dishes', (result) => {   
                console.log('Found Documents:\n' ,  result);
            
                    db.dropCollection('dishes', (result) => {
                        console.log('Dropped  collection ' + result);

                        client.close();
                    });
                })
           })
       });
   });

});