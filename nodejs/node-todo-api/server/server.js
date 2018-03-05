const express = require('express');
// `body-parser` takes your json response and conerts it to a js object
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
// tell mongoose how you want it to store documents
// the model name will be in lowercases and pluralized to be used as a name for the collection
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();

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


app.listen(3000, () => {
  console.log('Started on port 3000.');
});
