import React, { useState, useEffect,useRef } from 'react';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import useAuth from '../hooks/useAuth';

import axios from 'axios';
const PrivateChat = () => {
  
  const {auth}=useAuth();
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [receiverEmail, setReceiverEmail] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [users,setUsers]=useState([]);
  
  
  const pc=new RTCPeerConnection(null);
  const socketRTC=new WebSocket('ws://localhost:8080/socket');
  
  const remoteVideo = document.getElementById('remoteVideo');


  const getMedia=()=>{
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then((stream) => {
      // Add local stream to peer connection
      stream.getTracks().forEach(track => pc.addTrack(track, stream));
    })
    .catch(error => console.error('Error accessing media devices:', error));
  }

  pc.onicecandidate=(event)=>{
    if (event.candidate) {
      // Send the ICE candidate to the remote peer via your signaling server
      const iceCandidate = {
        candidate: event.candidate.candidate,
        sdpMLineIndex: event.candidate.sdpMLineIndex,
        sdpMid: event.candidate.sdpMid
      };
      // Send iceCandidate to the remote peer using your signaling server
      socketRTC.send(JSON.stringify({ type: 'ice-candidate', candidate: iceCandidate}));
      
    }
  }

  pc.ontrack = (event) => {
    if (event.streams && event.streams[0]) {
      remoteVideo.srcObject = event.streams[0];
    } else {
      if (!remoteVideo.srcObject) {
        remoteVideo.srcObject = new MediaStream();
      }
      remoteVideo.srcObject.addTrack(event.track);
    }
  };

  const sendOffer = async () => {
    try {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      socketRTC.send(JSON.stringify({ type: 'sdp-offer', offer: pc.localDescription}));
    } catch (error) {
      console.error('Error creating and sending offer:', error);
    }
  };


socketRTC.addEventListener("open",(event)=>{
  console.log('WebSocketRTC connection opened:', event);

  socketRTC.addEventListener('message',async (event) => {
    const message = JSON.parse(event.data);
    console.log('WebRTC connection state:', pc.iceConnectionState);
    if (message.type === 'sdp-offer') {
      await pc.setRemoteDescription(new RTCSessionDescription(message.offer));
      console.log("offer from "+event.data.receiverEmail);
      // Create and send an SDP answer to the remote peer
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socketRTC.send(JSON.stringify({ type: 'sdp-answer', answer: pc.localDescription}));
    } else if (message.type === 'sdp-answer') {
      console.log("Received sdp answer and i am");
      await pc.setRemoteDescription(new RTCSessionDescription(message.answer));
      
    } else if (message.type === 'ice-candidate') {
      // Handle incoming ICE candidate from the remote peer
      console.log("Received ICE");
      pc.addIceCandidate(new RTCIceCandidate(message.candidate));
    }
  });
  
})
  

 
  const getEmails=()=>{
    try{
      axios.get("http://localhost:8080/emails",{headers:{
        'Authorization':`Bearer `+auth.jwt
      }})
      .then((res)=>{
        
        
        setUsers(res.data);
        
      })
      .catch((err)=>{
        console.log(err);
      })
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    getEmails();
    getMedia();
  },[])

  

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws');
    const stomp = Stomp.over(socket);
    
    
    
    setSenderEmail(auth.email);

    stomp.connect({}, () => {
      setStompClient(stomp);
      console.log("Connectat la endpoint websocket")
    },(err)=>{
      console.log("nu a mers")
    });

    
    return () => {
      if (stomp && stomp.connected) {
        stomp.disconnect();
        console.log("Component unmounted 1");
      }
    };
  }, [receiverEmail, auth.email]);

 if(socketRTC!=null){
  socketRTC.addEventListener("error", (event) => {
    console.log("Ceva de la socket ", event)
  })
}
  





  useEffect(() => {
    if (stompClient) {
       stompClient.subscribe(`/user/${senderEmail}/private`, (message) => {
        const chatMessage = JSON.parse(message.body);
        console.log(message);
        setMessages((prevMessages)=>[...prevMessages, chatMessage]);
      });

    }
   
    return()=>{
      console.log("Component unmounted 2");
    }
  }, [receiverEmail]);

  const handleSend = () => {
    const message = messageInput.trim();
    
    if (stompClient && message !== '') {
      const chatMessage = {
        senderEmail,
        receiverEmail,
        message,
      };
      setMessages((prevMessages)=>[...prevMessages, chatMessage]);
      stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage));
      
      setMessageInput('');
    } else {
      console.error('Client or message undefined');
    }
  };

  const changeReceiver=(index)=>{
    console.log(users[index]);
    
    axios.get(`http://localhost:8080/chat/${users[index]}/${senderEmail}`,{
      headers:{
        'Authorization':`Bearer `+auth.jwt
      }    
    }).then((res)=>{
      setMessages(res.data);
    }).catch((err)=>{
      console.log(err);
    })
    setReceiverEmail(users[index]);
  }

  const handleInputChange = (e) => {
    setMessageInput(e.target.value);
  };

  if (stompClient === null) {
    return <div>Loading</div>;
  }

  return (
    <div style={{display:'flex',border:'1px',height:'500px',justifyContent:'center'}}>
      <div style={{width:'200px',borderRight:'1px solid',padding:'10px'}}>
        {users.map((email,index)=>(
          <div style={{paddingTop:'3px',border:'5px'}} key={index}>{auth.email!==email?<button style={{width:'200px'}} onClick={()=>changeReceiver(index)}>{email}</button>:<></>}
            
          </div>
        ))}
      </div>
      
      <div style={{width:'500px',borderRight:'1px solid',padding:'10px'}}>
        <div style={{flexGrow:'1',padding:'5px',overflowY:'auto',background:'white',height:'500px'}}>
          {messages.map((msg, index) => (
            <div key={index}>{msg.senderEmail===auth.email?
              <div style={{paddingLeft:'250px'}}>
                <p style={{fontSize:'14px'}}>Me</p> 
                <p style={{fontSize:'18px',fontWeight:'bold'}}>{msg.message}</p>
              </div>:
              <div style={{paddingRight:'250px'}}>
                <p style={{fontSize:'14px'}}>{msg.senderEmail}</p> 
                <p style={{fontSize:'18px',fontWeight:'bold'}}>{msg.message}</p>
              </div>
            }
            </div>
          ))}
          <input style={{width:'300px',marginTop:'100px'}} type="text" value={messageInput} onChange={handleInputChange} />
          <button onClick={handleSend}>Send</button>
          <video id="remoteVideo" autoPlay playsInline></video>


        </div>
        <div>
          <button onClick={sendOffer}>Call</button>
        </div>
        </div>  
    </div>
  );
};

export default PrivateChat;
