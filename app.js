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


const eventUsers = {};
const socketToEvent = {};

io.on('connection', socket => {
  socket.on('joining event', (eventID, isHost) => {

    if (eventUsers[eventID]) {
      eventUsers[eventID].push({
        id: socket.id,
        isHost
      });
    } else {
      eventUsers[eventID] = [{
        id: socket.id,
        isHost
      }];
    }
    console.log(eventUsers)
    socketToEvent[socket.id] = eventID;
    if (isHost) {
      const eventUsersInThisRoom = eventUsers[eventID].filter(user => user.id !== socket.id);
      socket.emit('all users', eventUsersInThisRoom);
    } else {
      const host = eventUsers[eventID].find(user => user.isHost === true)
      socket.emit('host', host)
    }
  })


  socket.on('sending signal', payload => {
    console.log('here')
    io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID })
  })

  socket.on('returning signal', payload => {
    io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id })
  })

  socket.on('disconnect', () => {
    const eventID = socketToEvent[socket.id];
    let event = eventUsers[eventID];
    if (event) {
      event = event.filter(user => user.id !== socket.id);
      eventUsers[eventID] = event;
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


