import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';

const Chat = (props) => {
  const socket = useRef();
  
  useEffect(() => {
    socket.current = io.connect('/');
  }, [])

  return (
    <div>
      <button>Send</button>
    </div>
  )
}

export default Chat;