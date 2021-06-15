import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import styles from './StreamRoom.module.scss';


const Video = (props) => {

  const ref = useRef();

  useEffect(() => {
    props.peer.on('stream', stream => {
      ref.current.srcObject = stream;
    })
  }, []);


  return (
    <video playsInline autoPlay ref={ref}></video>
  );
}

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2
}


const StreamRoom = ({ hostID, eventID, currentUserId }) => {

  const [ host, setHost ] = useState();
  const socketRef = useRef();
  const hostVideo = useRef();
  const peersRef = useRef([]);
  const hostRef = useRef();
  const isHost = currentUserId === '60c783c93805d227f3bf8734'
  console.log(currentUserId)

  useEffect(() => {
    socketRef.current = io.connect('/');

    if (isHost) {
      navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true}).then(stream => {
        hostVideo.current.srcObject = stream;
        socketRef.current.emit('joining event', eventID, isHost);
        socketRef.current.on('all users', users => {
          users.forEach(user => {
            const peer = createPeer(user.id, socketRef.current.id, stream);
            peersRef.current.push({
              peerID: user.id,
              peer
            })
          })
        })
        
        socketRef.current.on('user joined', payload => {
          console.log('here')
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer
          });
        });
  
        socketRef.current.on('receiving returned signal', payload => {
          const item = peersRef.current.find(p => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        })
  
      })
    } else {
      socketRef.current.emit('joining event', eventID, isHost);
      socketRef.current.on('host', host => {
        if (host) {
          console.log("HERE")
          const peer = createPeer(host.id, socketRef.current.id);
          hostRef.current = {
            peerID: host.id,
            peer
          };
          setHost(peer);
        }
      })
      socketRef.current.on('receiving returned signal', payload => {
        //const item = peersRef.current.find(p => p.peerID === payload.id);
        console.log(hostRef, payload.id)
        hostRef.current.peer.signal(payload.signal);
      })

    }

  }, [])

  
  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream
    })
    // upon Peer construction, singal gets sent out and must be captured
    peer.on('signal', signal => {
      socketRef.current.emit('sending signal', { userToSignal, callerID, signal })
    })
    
    return peer;
  }
  
  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream
    })
    
    peer.on('signal', signal => {
      socketRef.current.emit('returning signal', { signal, callerID })
    })
    
    peer.signal(incomingSignal);
    
    return peer;
  }

  useEffect(() => {
    
    if (host) {
      console.log("HERE host", host)
      host.on('stream', stream => {
        hostVideo.current.srcObject = stream;
      })
    }
  }, [host])
  
  return (
    <div>      
      <video muted={isHost} ref={hostVideo} autoPlay playsInline />
    </div>
  )

}

export default StreamRoom;