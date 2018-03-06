const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

const id = '5a9e30ee25f038136c98a08f';
// const id = '5a9e30ee25f038136c98a08f11';
// const id = '6a9e30ee25f038136c98a08f';

if(!ObjectID.isValid(id)) {
  console.log('ID not valid');
}

Todo.find({
  _id: id // mongoose will convert this string to ObjectId
}).then((todos) => {
  console.log('Todos', todos);
});

// only fetch the first document it can find
Todo.findOne({
  _id: id
}).then((todo) => {
  console.log('Todo', todo);
});

// fetch one document by its id
Todo.findById(id).then((todo) => {
  // even if you provide a wrong id, the query fetching won't end up as a fail.
  // you want to check if the result is what you want.
  if(!todo) {
    return console.log('Id not found');
  }
  console.log('Todo By Id', todo);
}).catch((e) => console.log(e));


User.findById('5a9d0c29d76bb23d314b6a08').then((user) => {
  if(!user)
    return console.log('User not found');
  console.log('User', user);
}).catch((e) => console.log(e));
