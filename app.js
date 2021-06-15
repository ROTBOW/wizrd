const express = require('express');
const app = express();
const http = require("http");
const socketIo = require("socket.io");
const server = http.Server(app);
const io = socketIo(server);
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

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}

// Add api routes
app.use('/api/users', users);
app.use('/api/events', events);

io.on('connection', (socket) => {
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

  socket.on("chat message", ({chatId, msg, username}) => {
    console.log('chat message: ' + msg);
    io.to(chatId).emit("new message", {username, msg});
  })
})

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server is running on port ${port}`));
