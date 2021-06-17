import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import Peer from 'peerjs';
import styles from './Video.module.scss';

const PEER_CONFIG = process.env.NODE_ENV === "production" ? 
{
  secure: true,
  port: ""
}
:
{
host: "localhost",
    port: 9000,
    path: '/peerjs',
    ssl: {
      key: "",
      cert: "",
    },
    proxied: true,
};

const Video = ({ eventId, isHost }) => {
  console.log({ eventId, isHost })

  const [stream, setStream] = useState(null);
  const socketRef = useRef();
  const peerRef = useRef();
  const peersRef = useRef(new Set());
  const videoRef = useRef();

  useEffect(() => {
    if (isHost) {
      startBroadcast();
    } else {
      receiveBroadcast();
    }
    return () => destroyPeers();
  }, [])

  useEffect(() => {
    if (stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream])
  console.log(peersRef.current)

  function startBroadcast() {
    console.log('i am host')
    socketRef.current = io.connect('/');
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      setStream(stream)
      
      const peer = new Peer(PEER_CONFIG)
      peerRef.current = peer;
      
      socketRef.current.emit('joining event', eventId);
      socketRef.current.on('user request stream', userId => peer.connect(userId))
      
      peer.on('open', () => socketRef.current.emit('host joined', peer.id))
      peer.on('connection', connection => {
        peer.call(connection.peer, stream);
        peersRef.current.add(peer)
        console.log('peersRef', peersRef.current)
        console.log(peer.connections)
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

    socketRef.current.emit('joining event', eventId);
    socketRef.current.on('host disconnected', () => setStream(null))
    socketRef.current.on('host request connection', hostId => peer.connect(hostId))

    peer.on('open', () => socketRef.current.emit('user joined', peer.id))
    peer.on('connection', connection => peer.connect(connection.peer))
    peer.on('call', call => {
      call.answer();
      call.on('stream', stream => setStream(stream))
    })
  }

  function destroyPeers() {
    peerRef.current.disconnect();
    peerRef.current.destroy();
    if (peersRef.current.length) {
      peersRef.current.forEach((peer) => {
        peer.disconnect();
        peer.destroy();
      })
    }
  }

  function onHostDisconnect() {
    peerRef.current.disconnect()
    peerRef.current.destroy()
  }

  function onHostConnect() {
    startBroadcast();
  }

  
  const StreamVideo = () => (
    stream ? 
      <video 
        muted 
        autoPlay 
        playsInline
        className={styles.video}
        ref={videoRef} 
      /> 
      : <div>Loading...</div>
  )

  const ToggleStreamButton = () => (
    isHost ? 
      <button 
        type="button" 
        className={styles.button}
        onClick={stream ? onHostDisconnect : onHostConnect }
      >
          { stream ? 'Pause' : 'Start' } Stream
      </button> 
      : null
  )

  return (
    <div className={styles.videoContainer}>

      <StreamVideo />
      <ToggleStreamButton />
    </div>
  );
}

export default Video;
