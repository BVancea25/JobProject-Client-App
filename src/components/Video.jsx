import React, { Component } from 'react';
import { useState,useEffect } from 'react';


const Video=()=>{
    const [pc, setPc] = useState(null);
    const [socketRTC, setRTC] = useState(null);

    useEffect(() => {
        const initializeConnection = async () => {
          const peerConnection = new RTCPeerConnection(null);
          const webSocket = new WebSocket('ws://localhost:8080/socket');
    
          setPc(peerConnection);
          setRTC(webSocket);
    
          peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
              webSocket.send(JSON.stringify({ type: 'ice-candidate', candidate: event.candidate }));
            }
          };
    
          peerConnection.ontrack = (event) => {
            const remoteVideo = document.getElementById('remoteVideo');
          
            if (event.streams && event.streams[0]) {
              // If there is a stream, set it as the srcObject of the remote video element
              remoteVideo.srcObject = event.streams[0];
            } else {
              // If there is no stream, create a new MediaStream and add the track to it
              if (!remoteVideo.srcObject) {
                remoteVideo.srcObject = new MediaStream();
              }
              remoteVideo.srcObject.addTrack(event.track);
            }
          };
    
          webSocket.addEventListener('open', (event) => {
            console.log('WebSocketRTC connection opened:', event);
          });
    
          webSocket.addEventListener('message', async (event) => {
            const message = JSON.parse(event.data);
    
            if (message.type === 'sdp-offer') {
              try {
                await peerConnection.setRemoteDescription(new RTCSessionDescription(message.offer));
                const answer = await peerConnection.createAnswer();
                await peerConnection.setLocalDescription(answer);
                webSocket.send(JSON.stringify({ type: 'sdp-answer', answer: peerConnection.localDescription }));
              } catch (error) {
                console.error('Error handling SDP offer:', error);
              }
            } else if (message.type === 'sdp-answer') {
              try {
                await peerConnection.setRemoteDescription(new RTCSessionDescription(message.answer));
              } catch (error) {
                console.error('Error handling SDP answer:', error);
              }
            } else if (message.type === 'ice-candidate') {
              peerConnection.addIceCandidate(new RTCIceCandidate(message.candidate));
            }
          });
        };
    
        initializeConnection();
      }, []);

      const getMedia = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
          stream.getTracks().forEach((track) => pc.addTrack(track, stream));
    
          const offer = await pc.createOffer();
          await pc.setLocalDescription(offer);
          socketRTC.send(JSON.stringify({ type: 'sdp-offer', offer: pc.localDescription }));
        } catch (error) {
          console.error('Error accessing media devices:', error);
        }
      };
    

  return(
  <div>
    <video id="remoteVideo" autoPlay playsInline></video>
  <button onClick={getMedia}>Call</button>
    </div>
  );
}

export default Video;