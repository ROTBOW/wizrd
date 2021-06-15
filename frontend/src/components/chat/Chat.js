import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

import styles from './Chat.module.scss';


const Chat = (props) => {
  const socket = useRef();
  const [messages, setMessages] = useState([]);
  // const [socket, setSocket] = useState();
  
  
  useEffect(() => {
    socket.current = io.connect('/');

    socket.current.emit('join chat', {
      chatId: 1
    });

    socket.current.on('new message', (msg) => {
      console.log("I'm executing");
        // console.log('chat message: ' + msg);
        let item = document.createElement('li');
        // console.log(item);
        const messages = document.getElementById('message-list');
        item.textContent = msg;
        messages.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
      });
  }, [])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("I'm handling an event");
    const input = document.getElementById("chat-input");
    // console.log(input);
    // console.log(input.value);
    if (input.value) {
      // console.log("about to emit");
      // console.log(socket.current);
      socket.current.emit('chat message', {chatId: 1, msg: input.value})
      input.value = '';
    };
  };

  return (
    <div>
      <ul className={styles.chatList} id="message-list">
        {/* {props.messages.map((message, i) => {
          return <li key={i}>{message}</li>;
        })} */}
      </ul>
      <form>
        <input type="text" id="chat-input"></input>
      </form>
      <button onClick={handleSubmit}>Send</button>
    </div>
  )
}

export default Chat;