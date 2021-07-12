# Wizrd

Wizrd is an event-driven streaming and messaging application for educational resources. By going live or scheduling future events, instructors and creators can connect with their audiences through real-time video streaming and chat.

![wizrd-splash](https://user-images.githubusercontent.com/74887895/124530504-7cf83500-ddc1-11eb-8844-827b3ebe01cc.png)

## Group Members

- **Inho Lee** 
  - [GitHub](https://github.com/inhojl), [LinkedIn](https://www.linkedin.com/in/inhojl)
- **Josiah Leon** 
  - [GitHub](https://github.com/ROTBOW), [LinkedIn](https://www.linkedin.com/in/josiah-leon)
- **Melissa Flynn** 
  - [GitHub](https://github.com/melflynn), [LinkedIn](https://www.linkedin.com/in/melissa-flynn-372b84b7)
- **Brandon Fang** 
  - [GitHub](https://github.com/brandonfang), [LinkedIn](https://www.linkedin.com/in/bdmfang)

## Overview

We wanted to create a platform where people can share their knowledge and experience with others. It would need to be interactive and in real time to make the user experience rich and dynamic. A user would be able to create a streaming event on a topic and other users would be able to join the event once the streaming goes live. The event creator can interact with the audience users via chat.

We will need to:
- Build a database to store information on users and events
- Construct a web application to give users the ability to create events and join events
- Set up the stream connections so that every user in an event see the same thing in real time
- Set up chat rooms for events

## Features

### User authentication (signup, login, logout)

![wizrd-auth](https://user-images.githubusercontent.com/74887895/124530704-e4ae8000-ddc1-11eb-90f8-c8c392ab11b8.gif)

```js
// routes/api/users.js
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const usernameOrEmail = req.body.usernameOrEmail;
  const password = req.body.password;
  let queryField;
  if (usernameOrEmail.includes('@')) {
    queryField = 'email';
  } else {
    queryField = 'username'
  }
  User.findOne({ [queryField]: usernameOrEmail }).then((user) => {
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = { 
          id: user.id, 
          username: user.username, 
          email: user.email, avatar: 
          user.avatar 
        };
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 14400 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token,
            });
          }
        );
      } else {
        return res.status(400).json({ password: 'Incorrect password' });
      }
    });
  });
});
```

### Events (create, update, delete, search)

![wizrd-event](https://user-images.githubusercontent.com/74887895/124530996-69010300-ddc2-11eb-953d-8a21c2363040.gif)


### Chat and messaging

![wizrd-chat](https://user-images.githubusercontent.com/74887895/124531261-00665600-ddc3-11eb-946d-a348843a034c.gif)

```js
// app.js
io.on('connection', (socket) => {
  socket.on("join chat", ({chatId, username}) => {
    socket.join(chatId);
  })

  socket.on("leave chat", ({chatId, username}) => {
    socket.leave(chatId);
  })

  socket.on("chat message", ({chatId, msg, username, avatar}) => {
    io.to(chatId).emit("new message", {username, msg, avatar});
  })
}

// frontend/src/components/chat/Chat.js
const Chat = (props) => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const socketRef = useRef();

  useEffect(() => {
    const inputElement = document.getElementById('chatInput');
    inputElement.addEventListener('keydown', (e) => {
      if(e.keyCode === 13) {
        e.preventDefault();
        handleSubmit(e);
        inputElement.focus();
      }
    }) 
    return () => {
      inputElement.removeEventListener('keydown', null);
    }
  }, []);

  useEffect(() => {
    let newSocket;
    if (!socket) {
      newSocket = io.connect('/');
      setSocket(newSocket);
      socketRef.current = newSocket;

      newSocket.emit('join chat', {
        chatId: props.chatId,
        username: props.user.username
      });
    } else {
      newSocket = socket;
    }
    newSocket.on('new message', ({ username, msg, avatar }) => {
      let message = [username, msg, avatar];
      setMessages([...messages, message]);
    });
    return () => newSocket.off('new message');
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = document.getElementById("chatInput");
    if (input.innerText) {
      socketRef.current.emit('chat message', { chatId: props.chatId, msg: input.innerText, username: props.user.username, avatar: props.user.avatar })
      input.innerText = '';
    }
  };

  ...
}
```

### Video streaming

![stream](https://user-images.githubusercontent.com/74887895/124531576-a4e89800-ddc3-11eb-99e6-45017265563b.gif)

```jsx
// app.js
io.on('connection', (socket) => {
  socket.on('joining event', ({ eventId, isHost}) => {
    socket.join(eventId);

    if (isHost) {
      if (streams[eventId]) {
        streams[eventId.host] = socket.id
      } else {
        streams[eventId] = {
          host: null,
          users: []
        }
        streams[eventId].host = socket.id
      }
    } else {
      if (streams[eventId]) {
        streams[eventId].users.push(socket.id)
      } else {
        streams[eventId] = {
          host: null,
          users: []
        }
        streams[eventId].users.push(socket.id)
      }
    }
    io.to(eventId).emit('viewer count', streams[eventId].users.length)

    socket.on('stream', (data) => io.to(eventId).emit('stream', data))
    socket.on('host joined', (hostId) => io.to(eventId).emit('host request connection', hostId))
    socket.on('user joined', (userId) => io.to(eventId).emit('user request stream', userId))
    socket.on('host disconnected', () => io.to(eventId).emit('host disconnected'))
    socket.on('disconnect', () => {
      if (socket.id === streams[eventId].host) {
        streams[eventId].host = null
        io.to(eventId).emit('host disconnected')
      } else {
        streams[eventId].users = streams[eventId].users.filter(user => user !== socket.id);
        io.to(eventId).emit('viewer count', streams[eventId].users.length)
        
      }
    })
  })
}

// frontend/src/components/chat/Video.jsx
const Video = ({ eventId, isHost }) => {
  const [stream, setStream] = useState(null);
  const socketRef = useRef();
  const peerRef = useRef();
  const peersRef = useRef(new Set());
  const videoRef = useRef();

  useEffect(() => {
    if (!isHost) {
      receiveBroadcast();
    } else {
      socketRef.current = io.connect('/');
      socketRef.current.emit('joining event', { eventId, isHost });
      socketRef.current.on('viewer count', (viewCount) => {
        const viewerCountEl = document.getElementById('viewerCount');
        viewerCountEl.innerHTML = viewCount;
        socketRef.current.emit('update viewer count', viewCount)
      })
    }
    return () => destroyRefs();
  }, []);

  useEffect(() => {
    if (stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => {
    window.addEventListener('beforeunload', destroyRefs);
  }, []);

  function startBroadcast() {
    console.log('emitting')
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      setStream(stream)
      const peer = new Peer(PEER_CONFIG)
      peerRef.current = peer;
      socketRef.current.on('user request stream', (userId) => {
        peer.connect(userId)
      })
      peer.on('open', () => socketRef.current.emit('host joined', peer.id))
      peer.on('connection', connection => {
        peer.call(connection.peer, stream);
        peersRef.current.add(peer)
      })
      peer.on('disconnected', () => {
        socketRef.current.emit('host disconnected')
        stream.getTracks().forEach((track) => {
          track.stop();
        })
        setStream(null)
      })
    })
  }

  function receiveBroadcast() {
    socketRef.current = io.connect('/');
    const peer = new Peer(PEER_CONFIG)
    peerRef.current = peer;
    socketRef.current.emit('joining event', { eventId });
    socketRef.current.on('host disconnected', () => setStream(null))
    socketRef.current.on('host request connection', hostId => peer.connect(hostId))
    socketRef.current.on('viewer count', (viewerCount) => {
      const viewerCountEl = document.getElementById('viewerCount');
      viewerCountEl.innerHTML = viewerCount;
    })
    peer.on('open', () => socketRef.current.emit('user joined', peer.id))
    peer.on('connection', connection => peer.connect(connection.peer))
    peer.on('call', call => {
      call.answer();
      call.on('stream', stream => setStream(stream))
    })

  }

  function destroyRefs() {
    ...
  }

  function onHostDisconnect() {
    if (window.confirm('Are you sure you want to turn off your video?')) {
      peerRef.current.disconnect()
      peerRef.current.destroy()
    }
  }

  function onHostConnect() {
    startBroadcast();
  }

  ...
}
```

### Video error handling

### Deployment with Heroku

### Production README

## Bonus Features

- [ ] Subscription to events
- [ ] Notifications
- [ ] Share screen on stream

## Backend Technologies: MongoDB/Express/Socket.io/WebRTC

We will be using MongoDB as our database and Mongoose as our ODM. 

Express will be used for our backend Node.js framework.

Socket.io will be used for messaging and streaming. 

PeerJS/WebRTC will be used to stream videos to users.

### Technical Challenges

- Secure user authentication
- Setting up Socket.io to work with chatting
- Setting up Socket.io and PeerJS to be able to create rooms and have multiple viewers connected to same stream
- Implementing event creation, update, and deletion

## Frontend Technologies: React/Redux/Sass

We will be using React to create and manage our UI components, Redux to keep track of state, and Sass modules to style our React components.

Frontend features include the user authentication flow and event-streaming flow.

### Technical Challenges

- Reading data from MongoDB and keeping Redux state normalized
- Creating user authentication forms
- Creating streaming event forms
- Subscribing to backend for real-time updates
- Creating unique rooms for events
