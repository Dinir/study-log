/*
  running the daemon after installing mongodb
  `mongod --dbpath ~/whatever/the/folder/the/data/is/stored`
 */

// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// `ObjectID` can be used to generate unique properties, whether inside of mongoDb or not.
// const obj = new ObjectID();

// you can start using a database without explicitly creating it
// it will be in the server after you actually start doing things in it
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if(err)
    return console.log('Unable to connect to MongoDB server.');
  console.log('Connected to MongoDB server');

  const db = client.db('TodoApp');

  /*// make a collection and insert one document
  db.collection('Todos').insertOne({
    text: 'Something to do',
    completed: false
  }, (err, result) => {
    if(err)
      return console.log('Unable to insert t odo.', err);
    // `.ops` includes all the documents inserted in the database
    console.log(JSON.stringify(result.ops, undefined, 2));
  });*/

  /*db.collection('Users').insertOne({
    // you can manually set the `_id`
    // _id: 123,
    name: 'Dinir',
    age: 12,
    location: 'internet'
  }, (err, result) => {
    if(err)
      return console.log('Unable to insert user.', err);
    console.log(result.ops[0]._id.getTimestamp());
  });*/

  client.close();
});
