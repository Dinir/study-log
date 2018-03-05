const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if(err)
    return console.log('Unable to connect to MongoDB server.');
  console.log('Connected to MongoDB server');

  const db = client.db('TodoApp');

  /*
  // .collection.find() gives a mongodb cursor.
  // .find(query)
  db.collection('Todos').find({
    _id: new ObjectID('5a9cea284672efd16d6e976d')
  }).toArray() // this will give you all documents in an array.
    .then((docs) => {
      console.log('Todos');
      console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
      console.log('Unable to fetch todos', err);
    });
  */

  /*
  db.collection('Todos').find()
    .count().then((count) => {
      console.log(`Todos count: ${count}`);
    }, (err) => {
      console.log('Unable to fetch todos', err);
    });
  */

  db.collection('Users').find({
    name: 'Dinir',
  }).toArray()
    .then((docs) => {
      console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
      console.log('Unable to fetch users', err);
    });

  // client.close();
});
