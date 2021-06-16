import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import Peer from 'peerjs';
import styles from './StreamRoom.module.scss';



const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2
}


const StreamRoom = ({ hostID, eventID, currentUserId }) => {

  const isHost = currentUserId === '60c783c93805d227f3bf8734'
  console.log(currentUserId)
  
  console.log(isHost)

  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);

  const peerOptions =
  process.env.NODE_ENV === "production"
    ? {
        secure: true,
        host: "distansingpeerserver.herokuapp.com",
        port: ""
      }
    : {
        // secure: true,
        host: "localhost",
        port: 9000,
        path: '/peerjs',
        ssl: {
          key: "",
          cert: "",
        },
        proxied: true,
        // debug: 3,
      };


  useEffect(() => {
    socketRef.current = io.connect('/');
    if (isHost) {
      console.log('i am host')
      navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true}).then(stream => {
        userVideo.current.srcObject = stream;
        socketRef.current.emit('joining event');
        
        socketRef.current.on('user request stream', userId => {
          console.log('received request from new user for stream')
          peer.connect(userId)
        })
  
        const peer = new Peer(peerOptions);
        peer.on('connection', connection => {
          peer.call(connection.peer, stream);
          peersRef.current.push(peer)
          console.log(peer.connections)
        })


     
      })
    } else {
      console.log('i am audience')
      socketRef.current.emit('joining event');

      const peer = new Peer(peerOptions)
      peer.on('open', () => {
        socketRef.current.emit('user joined', peer.id);
      })

      peer.on('connection', connection => {
        peer.connect(connection.peer)
      })

      peer.on('call', call => {
        console.log('received call from broadcaster')
        call.answer();
        call.on('stream', stream => {
          userVideo.current.srcObject = stream;
        })
      })
    }
    
  }, [])


  return (
    <div>
      <video muted={isHost} ref={userVideo} autoPlay playsInline />
     
    </div>
  )

}

export default StreamRoom;