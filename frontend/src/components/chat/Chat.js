import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import stringHash from 'string-hash';
import avatars from '../../assets/avatars/avatars';
import styles from './Chat.module.scss';

const COLORS = [
  styles.red,
  styles.orange,
  styles.green,
  styles.blue,
  styles.purple,
  styles.pink,
  styles.indigo
]

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

  }, [messages])

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = document.getElementById("chatInput");
    if (input.innerText) {
      socketRef.current.emit('chat message', { chatId: props.chatId, msg: input.innerText, username: props.user.username, avatar: props.user.avatar })
      input.innerText = '';
    };
  };

  return (
    <div className={styles.chatbox}>
      <div className={styles.chatHeader}>
        <h2 className={styles.heading}>Chat</h2>
      </div>
      <ul className={styles.chatContent}>
        {
          messages.slice().reverse().map((message, i) => {
            const usernameStyle = [ styles.username ]
            usernameStyle.push(COLORS[stringHash(message[0]) % COLORS.length]);
            return (
              <li key={i} className={styles.message}>
                <span className={`${usernameStyle.join(' ')} ${styles.userDisplay}`}><img src={avatars[Number(message[2])]} alt="" className={styles.avatar}/>{message[0]}</span><span>:</span><span>{message[1]}</span>
              </li>
            )
          })
        }
      </ul>
      <div className={styles.chatActionBox}>
        <div className={styles.chatInputArea}>
          <div className={styles.chatInputContainer}>
            <div id='chatInput' className={styles.chatInput} contentEditable placeholder="Insert Chat..." >
            </div>
          </div>
          <button onClick={handleSubmit} className={styles.sendButton} >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chat;