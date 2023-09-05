const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Server is running');
});

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('message', (message) => {
    console.log(`Received message: ${message}`);
    io.emit('message', message);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});