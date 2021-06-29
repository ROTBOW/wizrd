import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import Peer from 'peerjs';
import { BiVideo, BiVideoOff } from 'react-icons/bi';
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

  const [stream, setStream] = useState(null);
  const socketRef = useRef();
  const peerRef = useRef();
  const peersRef = useRef(new Set());
  const videoRef = useRef();

  useEffect(() => {
    if (!isHost) {
      receiveBroadcast();
    }
    return () => destroyRefs();
  }, [])

  useEffect(() => {
    if (stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream])

  useEffect(() => {
    window.addEventListener('beforeunload', destroyRefs);
  }, [])

  function startBroadcast() {
    socketRef.current = io.connect('/');
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      setStream(stream)

      const peer = new Peer(PEER_CONFIG)
      peerRef.current = peer;

      socketRef.current.emit('joining event', eventId);
      socketRef.current.on('user request stream', (userId) => {
        peer.connect(userId)
      })
      socketRef.current.on('user disconnected', () => {
        const viewerCountEl = document.getElementById('viewerCount');
        viewerCountEl.innerHTML = parseInt(viewerCountEl.innerHTML) - 1;
        socketRef.current.emit('update viewer count', parseInt(viewerCountEl.innerHTML));
      })
      
      
      
      peer.on('open', () => socketRef.current.emit('host joined', peer.id))
      peer.on('connection', connection => {
        peer.call(connection.peer, stream);
        peersRef.current.add(peer)

    

        const viewerCountEl = document.getElementById('viewerCount');
        viewerCountEl.innerHTML = parseInt(viewerCountEl.innerHTML) + 1;
        socketRef.current.emit('update viewer count', parseInt(viewerCountEl.innerHTML))
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
    peer.on('disconnected', () => {
      socketRef.current.emit('user disconnected')
    })
  }

  function destroyRefs() {
    if (peerRef.current) {
      peerRef.current.disconnect();
      peerRef.current.destroy();
      if (peersRef.current.length) {
        peersRef.current.forEach((peer) => {
          peer.disconnect();
          peer.destroy();
        })
      }
    }
    if (socketRef.current) {
      socketRef.current.close();
    }

    window.removeEventListener('beforeunload', destroyRefs);

  }

  function onHostDisconnect() {
    if (window.confirm('Are you sure you want to disconnect stream?')) {
      peerRef.current.disconnect()
      peerRef.current.destroy()
    }

  }

  function onHostConnect() {
    startBroadcast();
  }


  const StreamVideo = () => (
    stream ?
      <video
        muted={isHost}
        autoPlay
        playsInline
        className={styles.video}
        ref={videoRef}
      />
      : isHost ? null : <div className={styles.loading}>Waiting on host...</div>
  )

  const StreamOverlay = () => 
    isHost ? (
    <div className={styles.streamOverlay}>
      <button
        type="button"
        className={styles.videoButton}
        onClick={stream ? onHostDisconnect : onHostConnect}
      >
        {
          stream ?
          <BiVideoOff className={styles.videoIcon} />
          :
          <BiVideo className={styles.videoIcon} />
        }
      </button>
    </div>
    ) : null;

  return (
    <div className={styles.videoContainer}>
      <StreamVideo />
      <StreamOverlay />
    </div>
  );
}

export default Video;
