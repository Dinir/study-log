const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if(err)
    return console.log('Unable to connect to MongoDB server.');
  console.log('Connected to MongoDB server');

  const db = client.db('TodoApp');

  // deleteMany
  /*db.collection('Todos').deleteMany({text: 'Eat lunch'})
    .then((result) => {
      console.log(result);
    });*/

  // deleteOne
  /*db.collection('Todos').deleteOne({text: 'Eat lunch'})
    .then((result) => {
      console.log(result);
    });*/

  // findOneAndDelete / it returns the document that just got deleted
  /*db.collection('Todos').findOneAndDelete({completed: false})
    .then((result) => {
      console.log(result);
    });*/

  /*db.collection('Users').deleteMany({name: 'Dinir'})
    .then((result => {
      console.log(result);
    }));*/
  /*db.collection('Users').findOneAndDelete({
    _id: new ObjectID('5a9ce744a964060ee8df48d7')
  })
    .then((result) => {
      console.log(result);
    });*/

  // client.close();
});
