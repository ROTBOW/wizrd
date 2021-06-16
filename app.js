require('dotenv').config()
const express = require('express');
const http = require('http');
const app = express();
const httpServer = http.createServer(app);
const socket = require('socket.io');
const io = socket(httpServer);
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


io.on('connection', (socket) => {
  socket.on('joining event', (eventId) => {
    socket.join(eventId);
    console.log('joined event', socket.id)


    socket.on('stream', (data) => {
      console.log('streaming')
      io.to(eventId).emit('stream', data)
    })

    socket.on('user joined', (userId) => {
      console.log('a new user joined')
      io.to(eventId).emit('user request stream', userId)
    })

  })

  

})


const port = process.env.PORT || 5000;
httpServer.listen(port, () => console.log(`Server is running on port ${port}`));
//

