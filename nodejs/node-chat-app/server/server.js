/* eslint-disable no-console */
const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
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

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('createMessage', message => {
    console.log(`New message from ${message.from}: `);
    console.log(message.text);
    // `io.emit` emits event to every connected user
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });
});

server.listen(port, () => {
  console.log(`Starting the server at port ${port}`);
});
