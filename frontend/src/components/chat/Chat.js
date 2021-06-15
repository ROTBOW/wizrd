import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

import styles from './Chat.module.scss';


const Chat = (props) => {
  const socket = useRef();
  const [messages, setMessages] = useState([]);
  
  
  useEffect(() => {
    socket.current = io.connect('/');

    socket.current.emit('join chat', {
      chatId: 1
    });

    socket.current.on('new message', (msg) => {
        // let item = document.createElement('li');
        // const messages = document.getElementById('message-list');
        // item.textContent = msg;
        // messages.appendChild(item);
        // window.scrollTo(0, document.body.scrollHeight);
        console.log(messages);
        setMessages([...messages, msg]);
        console.log(messages);
      });
  }, [messages])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const input = document.getElementById("chat-input");
    if (input.value) {
      socket.current.emit('chat message', {chatId: 1, msg: input.value})
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