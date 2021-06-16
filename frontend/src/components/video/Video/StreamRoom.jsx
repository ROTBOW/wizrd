import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import styles from './StreamRoom.module.scss';
import axios from 'axios';

// export const login = (userData) => {
//   return axios.post('/api/users/login', userData);
// };




const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2
}


const StreamRoom = ({ hostID, eventID, currentUserId }) => {

  

  const videoRef = useRef()

  useEffect(() => {
    if (isHost) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          videoRef.current.srcObject = stream;
          const peer = createPeer();
          stream.getTracks().forEach(track => peer.addTrack(track, stream));
        })
    }
  })

  function createPeer() {
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.stunprotocol.org'
        }
      ]
    })
    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(peer);
    return peer;
  }

  async function handleNegotiationNeededEvent(peer) {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    const payload = {
      sdp: peer.localDescription
    }

    const { data } = await axios.post('/broadcast', payload);
    const desc = new RTCSessionDescription(data.sdp);
    peer.setRemoteDescription(desc).catch(e => console.log(e));
  }



  return (
    <div>
      <video muted={isHost} ref={videoRef} autoPlay playsInline />
    </div>
  )

}

export default StreamRoom;