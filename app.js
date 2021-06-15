require('dotenv').config()
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socket = require('socket.io');
const io = socket(server);
const db = require('./config/keys').mongoURI;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const users = require('./routes/api/users');
const events = require('./routes/api/events');
const User = require('./models/User');

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.log(err));



const streamUsers = {};
const socketToRoom = {};

io.on('connection', socket => {
  socket.on('join room', roomID => {
    if (streamUsers[roomID]) {
      streamUsers[roomID].push(socket.id);
    } else {
      streamUsers[roomID] = [socket.id];
    }
    socketToRoom[socket.id] = roomID;
    const streamUsersInThisRoom = streamUsers[roomID].filter(id => id !== socket.id);
     
    socket.emit('all users', streamUsersInThisRoom);
  })

  socket.on('sending signal', payload => {
    io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID })
  })

  socket.on('returning signal', payload => {
    io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id })
  })

  socket.on('disconnect', () => {
    const roomID = socketToRoom[socket.id];
    let room = streamUsers[roomID];
    if (room) {
      room = room.filter(id => id !== socket.id);
      streamUsers[roomID] = room;
    }
  })
})


// app.get('/', (req, res) => res.send('Hello World'));

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './frontend/build')));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
} 

// Add api routes
app.use('/api/users', users);
app.use('/api/events', events);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server is running on port ${port}`));
//