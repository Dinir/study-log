/* eslint-disable no-console */
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// setup for heroku
const port = process.env.PORT || 3000;

const app = express();

// set a configuration
app.set('view engine', 'hbs');

// use 'partial' pages
hbs.registerPartials(__dirname + '/views/partials');

// express middleware
// middleware can be used to add functionality to express functions
// custom middleware
app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n', err => {
    if(err) {
      console.log('Unable to append to server.log.');
    }
  });
  next();
});
// this middlewhere will block further processing because it excludes `next()`.
/*app.use((req, res, next) => {
  res.render('maintenance.hbs');
});*/
// `.static()` serves static files
app.use(express.static(__dirname + '/public'));

// use 'helper' functions that can be used in 'hbs' templates
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', text => text.toUpperCase());

// http request handler
app.get('/', (req, res) => {
  /*
  // send simple html
  // res.send('<h1>Hello Express!</h1>');
  // send JSON
  res.send({
    name: 'Dinir',
    likes: [
      'game',
      'stack'
    ]
  });
  */
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Hello peeps!'
  });
});

// listen on another route
app.get('/about', (req, res) => {
  // render hbs file and send back as a response
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'WutFace'
  });
});

// let the app listens to requests
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
