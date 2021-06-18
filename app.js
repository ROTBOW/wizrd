const express = require('express');
const app = express();
const http = require("http");
const socketIo = require("socket.io");
const httpServer = http.Server(app);
const io = socketIo(httpServer);
const db = require('./config/keys').mongoURI;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const { ExpressPeerServer } = require('peer');

const users = require('./routes/api/users');
const events = require('./routes/api/events');
const User = require('./models/User');


mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.log(err));

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
} else {
  const server = app.listen(9000);
  const peerServer = ExpressPeerServer(server, {
    allow_discovery: true
  })
  app.use('/peerjs', peerServer)
}

// Add api routes
app.use('/api/users', users);
app.use('/api/events', events);




const hosts = {};

io.on('connection', (socket) => {

  // Chat sockets
  console.log('a user connected')
  socket.on('disconnect', () => {
    console.log('user disconnected')
  });

  socket.on("join chat", ({chatId, username}) => {
    socket.join(chatId);
    console.log(username + " joined chatroom: " + chatId);
  })

  socket.on("leave chat", ({chatId, username}) => {
    socket.leave(chatId);
    console.log(username + " left chatroom: " + chatId);
  })

  socket.on("chat message", ({chatId, msg, username, avatar}) => {
    console.log('chat message: ' + msg);
    io.to(chatId).emit("new message", {username, msg, avatar});
  })

  // Stream sockets
  socket.on('joining event', (eventId) => {
    socket.join(eventId);
    socket.on('stream', (data) => io.to(eventId).emit('stream', data))
    socket.on('host joined', (hostId) => {
      hosts[eventId] = socket.id;
      io.to(eventId).emit('host request connection', hostId)
    })
    socket.on('user joined', (userId) => io.to(eventId).emit('user request stream', userId))
    socket.on('host disconnected', () => io.to(eventId).emit('host disconnected'))
    socket.on('disconnect', () => {
      if (socket.id === hosts[eventId]) {
        console.log('here')
        delete hosts[eventId]
        io.to(eventId).emit('host disconnected')
      } else {
        io.to(eventId).emit('user disconnected')
      }
    })
    socket.on('user disconnected', () => console.log('disconnecasdjflkasdklfjlsdkf'))
    socket.on('update viewer count', (viewerCount) => {
      console.log(viewerCount)
      io.to(eventId).emit('viewer count', viewerCount)
    })
  })

})

const port = process.env.PORT || 5000;
httpServer.listen(port, () => console.log(`Server is running on port ${port}`));
