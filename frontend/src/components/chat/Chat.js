import React, { useEffect, useState, useRef } from 'react';
import rightArrow from '../../assets/rightArrow.png';
import io from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagic } from '@fortawesome/free-solid-svg-icons';
import stringHash from 'string-hash';
import avatars from '../../assets/avatars/avatars';

// avatars[Number(props.user.avatar)

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
      if(e.keyCode == 13) {
        console.log('executing enter')
        e.preventDefault();
        handleSubmit(e);
        inputElement.focus();
      }
    }) 
    return () => {
      inputElement.removeEventListener('keydown', null);
    }
  }, [])

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
    console.log(input.innerText)
    if (input.innerText) {
      socketRef.current.emit('chat message', { chatId: props.chatId, msg: input.innerText, username: props.user.username, avatar: props.user.avatar })
      input.innerText = '';
    };
  };

  console.log(messages)
  return (
    <div className={styles.chatbox}>
      <div className={styles.chatHeader}>
        <h2 className={styles.heading}>Chat</h2>
      </div>
      <ul className={styles.chatContent}>
        {
          messages.slice().reverse().map((message, i) => {
            const usernameStyle = [ styles.username ]
            console.log(message)
            usernameStyle.push(COLORS[stringHash(message[0]) % COLORS.length]);
            return (
              <li key={i} className={styles.message}>
                <span><img src={avatars[Number(message[2])]}/></span><span className={usernameStyle.join(' ')}>{message[0]}</span>: <span>{message[1]}</span>
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
  // <div className={styles.wrapper}>
  //   <ul className={styles.messageList}>
  //     {messages.reverse().map((message, i) => {
  //       return <li key={i} className={styles.message}><i className={styles.specialText}>{message[0]}</i>: {message[1]}</li>;
  //     })}
  //   </ul>
  //   <form className={styles.messageInput}>
  //     <input autoComplete="off" type="text" id="chat-input"></input>
  //     <button onClick={handleSubmit} className={styles.button} >
  //       <FontAwesomeIcon icon={faMagic} />
  //     </button>
  //   </form>
  // </div>
}

export default Chat;