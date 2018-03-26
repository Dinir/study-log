/* eslint-disable no-console */
const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');

const app = express();
// const server = http.createServer((req, res) => {});
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

app.use(express.static(publicPath));

/*
  to everyone, in a room
  io.emit -> io.to(roomname).emit

  to everyone except the current user, in a room
  socket.broadcast.emit -> socket.broadcast.to(roomname).emit

  to current user
  socket.emit
 */

// `socket.leave(roomname)` kicks the user from the room

// listens for a new connection
// `socket` refers to individual connections
io.on('connection', socket => {
  console.log('New user connected');

  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room))
      return callback('Name and room name are required.');

    /*
    when a user join,
    remove their any potential past user data, and then add them to the new room specified.
     */
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    socket.emit('newMessage', generateMessage('Server', 'Welcome to the chat app.'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Server', `${params.name} has joined.`));

    callback();
  });

  socket.on('disconnect', () => {
    const user = users.removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Server', `${user.name} has left.`));
    }
  });

  socket.on('createMessage', (message, callback) => {
    const user = users.getUser(socket.id);

    if(user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }

    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    const user = users.getUser(socket.id);

    if(user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(
        user.name, coords.latitude, coords.longitude
      ));
    }
  });
});

server.listen(port, () => {
  console.log(`Starting the server at port ${port}`);
});
