import React, { useState } from 'react';
import '../styles/Login.css'
import user_icon from '../assets/person.png'
import axios from 'axios';
import password_icon from '../assets/password.png'
import gray_icon from '../assets/gray.jpg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
const LoginSignUp=()=>{
    const nav=useNavigate();
    const {setAuth}=useAuth();
    const [action,setAction]=useState("Sign Up");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setUserType] = useState('USER');
    const [phone,setPhone]=useState('');
    const [firstName,setFirst]=useState('');
    const [lastName,setLast]=useState('');
    const [companyName,setCompanyName]=useState('');
    const [cvFile,setCV]=useState(null);
    

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
      };
    
      
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    const handleFirstChange = (event) => {
        setFirst(event.target.value);
    };

    const handleLastChange = (event) => {
        setLast(event.target.value);
    };

    const handleCompanyChange = (event) => {
        setCompanyName(event.target.value);
    };

    const handleCVChange = (event) => {
        const file = event.target.files[0];
        setCV(file);
      };

    const handleFormSubmit = async () => {
        try {
           if(action==="Sign Up"){ 
                const formData = new FormData();
                formData.append('request', JSON.stringify({ 
                    email,
                    password,
                    role,
                    phone,
                    firstName,
                    lastName,
                    companyName,
                  }));
                
                formData.append('cv', cvFile);
                console.log(cvFile.type);
                const response = await axios.post('http://localhost:8080/auth/register', formData,{headers:{'Content-Type':'multipart/form-data'}});
                if(response.status===200){
                    setAction("Login");
                    setEmail('');
                    setPassword('');
                    setFirst('');
                    setLast('');
                    setPhone('');
                    setCompanyName('');
                    setCV(null);
                    toast.success('Registered successfuly !!!');
                }else{
                    toast.error("Problem with server")
                }
            }else{
                const response = await axios.post('http://localhost:8080/auth/authenticate', {
                    email,
                    password            
                });
                
                const jwt=response.data.jwt;
                const userRole=response.data.role;
                
                if(jwt){
                    localStorage.setItem("LoginMessage","Logged in successfuly");
                    setAuth({ userRole, jwt });
                    if(userRole==="[USER]"){
                        nav("/");
                        console.log("to job list USER")
                    }else{
                        nav("/jobs");
                        console.log("to job list EMPLOYER")
                    }
                }else{
                    toast.info("The server had some trouble with your request !!!")
                }
                
                
            }
          // Handle the response from the backend here
        } catch (error) {
          console.error('Error:', error);
          toast.error("Email and password combination don't match !!!");
        }
      };


    return(
        <div className='container'>
            <ToastContainer autoClose={3000}/>
            <div className='header'>
                <div className='text'>{action}</div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
                {action==="Login"?<div></div>:<div>
                <div className="radio-group">
                    <label className='radio-group label'>
                    <input
                    className='radio-group-in'
                        type="radio"
                        value="EMPLOYER"
                        checked={role === 'EMPLOYER'}
                        onChange={() => setUserType('EMPLOYER')}
                    />
                    Employer
                    </label>
                    <label className='radio-group label'>
                    <input
                        className='radio-group-in'
                        type="radio"
                        value="USER"
                        checked={role === 'USER'}
                        onChange={() => setUserType('USER')}
                    />
                    Job Seeker
                    </label>
                </div>    
                </div>}
                
                <div className='input'>
                    <img src={user_icon} alt=""></img>
                    <input type='email' value={email} placeholder='Email' onChange={handleEmailChange}></input>
                </div>
                <div className='input'>
                    <img src={password_icon} alt=""></img>
                    <input type='password' value={password} placeholder='Password' onChange={handlePasswordChange}></input>
                </div>

                {role==="USER" && action==="Sign Up"?<div className='inputss'>
                    <div className='input'>
                        <img src={gray_icon} alt=""></img>
                        <input type='text' value={phone} placeholder='Phone Number' onChange={handlePhoneChange}></input>
                    </div>
                    <div className='input'>
                        <img src={gray_icon} alt=""></img>
                        <input type='text' value={firstName} placeholder='First Name' onChange={handleFirstChange}></input>
                    </div>
                    <div className='input'>
                        <img src={gray_icon} alt=""></img>
                        <input type='text' value={lastName} placeholder='Last Name' onChange={handleLastChange}></input>
                    </div>
                    <div className='input'>
                        <img src={gray_icon} alt=""></img>
                        <input type='file' accept='.pdf' placeholder='Your CV' onChange={handleCVChange}></input>
                    </div>
                    
                </div>:role==="EMPLOYER" && action==="Sign Up"?<div className='inputss'>
                    <div className='input'>
                        <img src={gray_icon} alt=""></img>
                        <input type='text' value={companyName} placeholder='Company Name' onChange={handleCompanyChange}></input>
                    </div>
                    </div>:
                    <div></div>
                    }
            </div>
            <div className='submit-container'>
                <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
                <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
                
            </div>
            <div className='submit-container'> 
                <div className='submit-button' onClick={handleFormSubmit}>Submit</div>
            </div>
        </div>
    )
}

export default LoginSignUp;