import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

import styles from './Chat.module.scss';


const Chat = (props) => {
  const socket = useRef();
  const [messages, setMessages] = useState([]);
  
  
  useEffect(() => {
    socket.current = io.connect('/');

    socket.current.emit('join chat', {
      chatId: props.chatId,
      username: props.user.username
    });

    socket.current.on('new message', ({username, msg}) => {
        // let item = document.createElement('li');
        // const messages = document.getElementById('message-list');
        // item.textContent = msg;
        // messages.appendChild(item);
        // window.scrollTo(0, document.body.scrollHeight);
        console.log(messages);
        let message = `${username}: ${msg}`;
        setMessages([...messages, message]);
        console.log(messages);
      });
  }, [messages])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const input = document.getElementById("chat-input");
    if (input.value) {
      socket.current.emit('chat message', {chatId: props.chatId, msg: input.value, username: props.username})
      input.value = '';
    };
  };

  return (
    <div>
      <ul className={styles.chatList} id="message-list">
        {messages.map((message, i) => {
          return <li key={i}>{message}</li>;
        })}
      </ul>
      <form>
        <input type="text" id="chat-input"></input>
      </form>
      <button onClick={handleSubmit}>Send</button>
    </div>
  )
}

export default Chat;