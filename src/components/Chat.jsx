import React, { useState, useEffect } from 'react';
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
  },[])
  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws');
    const stomp = Stomp.over(socket);

    
    setSenderEmail(auth.email);

    stomp.connect({}, () => {
      setStompClient(stomp);
      console.log("ceva")
    },(err)=>{
      console.log("nu a mers")
    });

    return () => {
      if (stomp && stomp.connected) {
        stomp.disconnect();
      }
    };
  }, [receiverEmail, auth.email]);

  useEffect(() => {
    if (stompClient) {
       stompClient.subscribe(`/user/${senderEmail}/private`, (message) => {
        const chatMessage = JSON.parse(message.body);
        console.log(chatMessage);
        setMessages([...messages, chatMessage]);
      });

      // return () => {
      //   if (subscription) {
      //     subscription.unsubscribe();
      //   }
      // };
    }
  }, [stompClient]);

  const handleSend = () => {
    const message = messageInput.trim();
    
    if (stompClient && message !== '') {
      const chatMessage = {
        senderEmail,
        receiverEmail,
        message,
      };
      setMessages([...messages,chatMessage]);
      stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage));
      console.log(chatMessage);
      setMessageInput('');
    } else {
      console.error('Client or message undefined');
    }
  };

  const changeReceiver=(index)=>{
    setReceiverEmail(users[index]);
  }

  const handleInputChange = (e) => {
    setMessageInput(e.target.value);
  };

  if (stompClient === null) {
    return <div>Loading</div>;
  }

  return (
    <div style={{display:'flex',border:'1px',height:'500px'}}>
      <div style={{width:'200px',borderRight:'1px solid',padding:'10px'}}>
        {users.map((email,index)=>(
          <div key={index}>
            <button onClick={()=>changeReceiver(index)}>{email}</button>
          </div>
        ))}
      </div>
      
      <div style={{width:'500px',borderRight:'1px solid',padding:'10px'}}>
        <div style={{flexGrow:'1',padding:'10px',overflowY:'auto',color:'white',height:'500px'}}>
          {messages.map((msg, index) => (
            <div key={index}>
              <strong>{msg.senderEmail}:</strong> {msg.message}
            </div>
          ))}
        </div>
        <div>
          <input type="text" value={messageInput} onChange={handleInputChange} />
          <button onClick={handleSend}>Send</button>
        </div>
        </div>  
    </div>
  );
};

export default PrivateChat;
