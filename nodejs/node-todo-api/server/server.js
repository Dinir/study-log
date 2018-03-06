const express = require('express');
// `body-parser` takes your json response and conerts it to a js object
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {ObjectID} = require('mongodb');
// tell mongoose how you want it to store documents
// the model name will be in lowercases and pluralized to be used as a name for the collection
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

// add middleware
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  // console.log(req.body); // `req.body` is parsed by the middleware
  const todo = new Todo({
    text: req.body.text
  });

  // see https://httpstatuses.com to see available status codes
  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    // by wrapping the results in an object, you can send more information with the results
    res.send({
      todos
    });
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
  const id = req.params.id;

  if(!ObjectID.isValid(id))
    return res.status(404).send();

  Todo.findById(id).then(todo => {
    if(todo)
      return res.send({todo});
    res.status(404).send();
  }, e => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Started on port ${port}.`);
});

module.exports = {app};
