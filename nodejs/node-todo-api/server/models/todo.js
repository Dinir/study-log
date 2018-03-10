const mongoose = require('mongoose');

const Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: [true, 'Please specify the name of the task.'],
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number, // unix timestamp
    default: null
  },
  _creator: {
    type:mongoose.Schema.Types.ObjectId,
    required: true
  }
});

module.exports = {Todo};

/*
 these are example codes using mongoose.
 Originally they were in `server.js`, and I'll keep them here so I can return back to here when I forget everything yet again.
 */

/*const newTodo = new T\odo({
  text: 'Cook dinner'
});

// this actually save the document to the database
newTodo.save().then((doc) => {
  console.log('Saved t odo', doc);
}, (e) => {
  console.log('Unable to save t odo.');
});*/

/*const anotherTodo = new T\odo({
  text: 'Walk the dog',
  completed: true,
  completedAt: 19224814950
});

anotherTodo.save().then((doc) => {
  console.log('Saved t\odo', doc);
}, (e) => {
  console.log('Unable to save t\odo.');
});*/

/*const otherTodo = new To\do({
  text: '    Edit this video. '
});

otherTodo.save().then(
  (doc) => console.log('Saved', doc),
  (e) => console.log('Unable to save.', e)
);*/

/*new User({
  //email: 'Dinir@internet.com'
}).save().then(
  (doc) => console.log('Saved the user', doc),
  (e) => console.log('Unable to save.', e)
);*/
