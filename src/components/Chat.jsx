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
      console.log("Connectat la endpoint websocket")
    },(err)=>{
      console.log("nu a mers")
    });

    // return () => {
    //   if (stomp && stomp.connected) {
    //     stomp.disconnect();
    //     console.log("Component unmounted 1");
    //   }
    // };
  }, [receiverEmail, auth.email]);


  





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
        </div>
        <div>
          
        </div>
        </div>  
    </div>
  );
};

export default PrivateChat;
