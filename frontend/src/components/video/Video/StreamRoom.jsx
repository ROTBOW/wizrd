import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import styles from './StreamRoom.module.scss';




const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2
}


const StreamRoom = ({ hostID, eventID, currentUserId }) => {

  const [host, setHost] = useState();
  const socketRef = useRef();
  const hostVideo = useRef();
  const peersRef = useRef([]);
  const hostRef = useRef();
  const isHost = currentUserId === '60c783c93805d227f3bf8734'
  console.log(currentUserId)

  useEffect(() => {
    socketRef.current = io.connect('/');

    if (isHost) {
      console.log('isHost')
      navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
        hostVideo.current.srcObject = stream;
        console.log(stream)
        socketRef.current.emit('joining event', eventID, isHost);
        socketRef.current.on('all users', users => {
          console.log("received all users", { users })

        })

        socketRef.current.on("user joined", payload => {
          console.log('user joined')

          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          })
        });


      })
    } else {
      socketRef.current.emit('joining event', eventID, isHost);
      socketRef.current.on('host', host => {
        console.log('host', host)
        const peer = createPeer(host.id, socketRef.current.id);
        hostRef.current = {
          hostID: host.id,
          peer
        }
        setHost(peer)
      })

      socketRef.current.on("receiving returned signal", payload => {
        // console.log('user received back signal')
        //hostRef.current.peer.signal(payload)
        hostRef.current.peer.signal(payload.signal);
        // console.log('signal accepted')
      });


    }

  }, [])


  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", signal => {
      console.log('creating host peer and sending signal to host')
      socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
    })

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    console.log('adding user peer and sending signal to back to user')

    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream
    })

    peer.on("signal", signal => {
      socketRef.current.emit("returning signal", { signal, callerID })
    })

    peer.signal(incomingSignal);

    return peer;
  }

  useEffect(() => {

    if (host) {
      host.on('stream', stream => {
        console.log('receiving streaming')
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