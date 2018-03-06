const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

// T\odo.remove({}).then((result) => {
//   console.log(result);
// });

Todo.findOneAndRemove({_id: '5a9e549f1bf7c43fc759594e'}).then((todo) => {

});

// T\odo.findByIdAndRemove

Todo.findByIdAndRemove('5a9e549f1bf7c43fc759594e').then((todo) => {
  console.log(todo);
});
