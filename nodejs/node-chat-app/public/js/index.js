/** @var socket creates the connection, returns the socket */
var socket = io();

socket.on('connect', function() {
  console.log('Connected to server.');

  socket.emit('createMessage', {
    from: 'Dinir',
    text: 'the pizza is okay'
  });
});

socket.on('disconnect', function() {
  console.log('Disconnected from server.');
});

socket.on('newMessage', function(message) {
  console.log(`New message from ${message.from}: `);
  console.log(message.createdAt);
  console.log(message.text);
});
