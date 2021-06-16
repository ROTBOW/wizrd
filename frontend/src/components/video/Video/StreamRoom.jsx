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

  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const peerRef = useRef();

  const [ stream, setStream ] = useState(null);

  const peerOptions =
  process.env.NODE_ENV === "production"
    ? {
        secure: true,
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

      startBroadcast()



    } else {
      const peer = new Peer(peerOptions)
      peerRef.current = peer;
      console.log('i am audience')
      socketRef.current.emit('joining event', eventID);
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
          //userVideo.current.srcObject = stream;
          setStream(stream)
        })
      })

      peer.on('disconnected', () => {
          console.log('peer disconnected')
      })

      socketRef.current.on('host disconnected', () => {
        console.log('host has been dsiconnected')
        setStream(null)
      })

      socketRef.current.on('host request connection', hostId => {
        console.log('host is requesting connection')
        peer.connect(hostId)
      })

    }
    
    return () => {
      peerRef.current.disconnect()
      peerRef.current.destroy()
    }
  }, [])

  useEffect(() => {
    if (stream) {
      userVideo.current.srcObject = stream;
    }

  }, [stream])

  const onHostDisconnect = () => {
    peerRef.current.disconnect()
    peerRef.current.destroy()
  }

  const onHostConnect = () => {
    startBroadcast();
  }

  function startBroadcast() {
    console.log('i am host')
    navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true}).then(stream => {
      const peer = new Peer(peerOptions)
      peerRef.current = peer;
    //  userVideo.current.srcObject = stream;
      setStream(stream)
      socketRef.current.emit('joining event', eventID);
      
      socketRef.current.on('user request stream', userId => {
        console.log('received request from new user for stream')
        peer.connect(userId)
      })

      peer.on('open', () => {
        console.log('opening peer connection')
        socketRef.current.emit('host joined', peer.id)
      })


      //const peer = new Peer(peerOptions);
      peer.on('connection', connection => {
        peer.call(connection.peer, stream);
        peersRef.current.push(peer)
        console.log(peer.connections)
      })
      
      peer.on('disconnected', () => {
        console.log('host disconnected')
        socketRef.current.emit('host disconnected')
        setStream(null)
      })

    })

  }


  return (
    <div>
      {
        stream ? <video muted ref={userVideo} autoPlay playsInline /> : null
      }
      <button type="button" onClick={onHostDisconnect}>Host Disconnect</button>
      <button type="button" onClick={onHostConnect}>Host Connect</button>
    
    </div>
  )

}

export default StreamRoom;