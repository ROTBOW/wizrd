import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import Peer from 'peerjs';


import './Video.scss';

const Video = () => {

  const socket = useRef();

  useEffect(() => {
    socket.current = io.connect('/');
    const myPeer = new Peer({
        host: '/',
        path: '/',
        port: 9000
      })

    const videoGrid = document.getElementById('video-grid');
    const myVideo = document.createElement('video');
    myVideo.muted = true;

    const peers = {};

    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(stream => {
      addVideoStream(myVideo, stream)

      myPeer.on('call', call => {
        call.answer(stream);

        const video = document.createElement('video');
        call.on('stream', userVideoStream => {
          addVideoStream(video, userVideoStream)
        })
      })

      socket.current.on('user-connected', userId => {
        console.log('user connected', userId)
        connectToNewUser(userId, stream);
      })
      
    })

    socket.current.on('user-disconnected', userId => {
      if (peers[userId]) peers[userId].close()
    })

    myPeer.on('open', id => {
      socket.current.emit('join-room', 'room', id)
    })


    function connectToNewUser(userId, stream) {
      const call = myPeer.call(userId, stream);
      const video = document.createElement('video');
      call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
      })
      call.on('close', () => {
        video.remove()
      })
      peers[userId] = call
    
    }
    
    function addVideoStream(video, stream) {
      video.srcObject = stream;
      video.addEventListener('loadedmetadata', (event) => {
        console.log(event)
        video.play()
      })
      videoGrid.append(video)
    }
  

  }, [])


  return (
    <div id='video-grid'>

    </div>
  );
}

export default Video;
