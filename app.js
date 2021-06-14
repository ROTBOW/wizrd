const { PeerServer } = require('peer');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server)
const db = require('./config/keys').mongoURI;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const { v4: uuidV4 } = require('uuid');

const users = require('./routes/api/users');
const events = require('./routes/api/events');
const User = require('./models/User');
const e = require('express');


mongoose 
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.log(err));


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}


app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Add api routes
app.use('/api/users', users);
app.use('/api/events', events);

const port = process.env.PORT || 5000;


// Peer Server
let peerServer;
if (process.env.NODE_ENV === 'production') {
  peerServer = new PeerServer({ 
    secure: true,
    host: 'mebrinjo.herokuapp.com',
    port: 443, 
  })
} else {
  peerServer = new PeerServer({ 
    port: 9000, 
    path: '/peer'
  })
}


io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    console.log(roomId, userId)
    socket.join(roomId)
    socket.broadcast.to(roomId).emit('user-connected', userId)
    socket.on('disconnect', () => {
      socket.broadcast.to(roomId).emit('user-disconnected', userId)
    })
  })
})


server.listen(port, () => console.log(`Server is running on port ${port}`));