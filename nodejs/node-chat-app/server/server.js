/* eslint-disable no-console */
const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');

const app = express();
// const server = http.createServer((req, res) => {});
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

// listens for a new connection
// `socket` refers to individual connections
io.on('connection', socket => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Server', 'Welcome to the chat app.'));
  // `socket.broadcast` targets every user but the user connected via the socket
  socket.broadcast.emit('newMessage', generateMessage('Server', 'New user joined.'));

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('createMessage', (message, callback) => {
    console.log(`New message from ${message.from}: `);
    console.log(message.text);

    // `io.emit` emits event to every connected user
    io.emit('newMessage', generateMessage(message.from, message.text));

    callback('This is from the server.');
  });

  socket.on('createLocationMessage', (coords) => {
    console.log(`New location message:`, coords);
    io.emit('newLocationMessage', generateLocationMessage('Server', coords.latitude, coords.longitude));
  });
});

server.listen(port, () => {
  console.log(`Starting the server at port ${port}`);
});
