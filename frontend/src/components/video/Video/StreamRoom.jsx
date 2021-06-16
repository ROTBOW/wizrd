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

  const [video, setVideo] = useState(null)
  const videoRef = useRef()
  const userRef = useRef()


  const isHost = currentUserId === '60c783c93805d227f3bf8734'

  useEffect(() => {
    if (isHost) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          videoRef.current.srcObject = stream;
          const peer = createPeer();
          stream.getTracks().forEach(track => peer.addTrack(track, stream));
        })
    } else {

    }
  }, [])

  useEffect(() => {
    if (video) {
      console.log('executing')
      userRef.current.srcObject = video;

    }
  }, [video])

  const onClick = () => {
    const peer = createPeer();
    peer.addTransceiver('video', { direction: 'recvonly' })
  }


  function createPeer() {
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.stunprotocol.org'
        }
      ]
    })
    if (!isHost) {
      peer.ontrack = handleTrackEvent;
    }
    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(peer);
    return peer;
  }

  async function handleNegotiationNeededEvent(peer) {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    const payload = {
      sdp: peer.localDescription
    }

    const endpoint = isHost ? '/broadcast' : '/consumer'

    const { data } = await axios.post(endpoint, payload);
    const desc = new RTCSessionDescription(data.sdp);
    peer.setRemoteDescription(desc).catch(e => console.log(e));
  }

  function handleTrackEvent(e) {

    // videoRef.current.srcObject = e.streams[0];
    setVideo(e.streams[0])
  }





  return (
    <div>


      <video muted={isHost} ref={videoRef} autoPlay playsInline>

      </video>

      <button type="button" onClick={onClick} >View Stream</button>
       
      {
        video ?
        <video muted={isHost} ref={userRef} autoPlay playsInline>

        </video>
        : null
      }

    </div>
  )

}

export default StreamRoom;