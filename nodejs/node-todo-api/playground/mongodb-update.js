const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if(err)
    return console.log('Unable to connect to MongoDB server.');
  console.log('Connected to MongoDB server');

  const db = client.db('TodoApp');

  // findOneAndupdate / update and return the original document by default
  /*db.collection('Todos').findOneAndUpdate({
    _id: new ObjectID('5a9cfa814672efd16d6e9c31')
  }, {
    // need to specify update operators
    // https://docs.mongodb.com/manual/reference/operator/update/
    $set: {
      completed: true
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });*/
  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5a9ce8fe4fea641046bfbdd6')
  }, {
    $set: {name: 'not Dinir'},
    $inc: {age: 1}
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

  // client.close();
});
