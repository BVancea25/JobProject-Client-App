import React, { Component, useState } from 'react';
import '../styles/Login.css'
import user_icon from '../assets/person.png'
import axios from 'axios';
import password_icon from '../assets/password.png'
import { act } from 'react-dom/test-utils';
import gray_icon from '../assets/gray.jpg'
const LoginSignUp=()=>{

    const [action,setAction]=useState("Sign Up");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setUserType] = useState('jobseeker');
    const [phone,setPhone]=useState('');
    const [firstName,setFirst]=useState('');
    const [lastName,setLast]=useState('');
    const [companyName,setCompanyName]=useState('');

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

    const handleFormSubmit = async () => {
        try {
           if(action==="Sign Up"){ 
                const response = await axios.post('http://localhost:8080/auth/register', {
                    email,
                    password,
                    role,
                    firstName,
                    lastName,
                    phone,
                    companyName

                });
                if(response.status===200){
                    setAction("Login");
                }
            }else{
                const response = await axios.post('http://localhost:8080/auth/authenticate', {
                    email,
                    password            
                });
            }
          // Handle the response from the backend here
        } catch (error) {
          console.error('Error:', error);
        }
      };


    return(
        <div className='container'>
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
                        value="employer"
                        checked={role === 'employer'}
                        onChange={() => setUserType('employer')}
                    />
                    Employer
                    </label>
                    <label className='radio-group label'>
                    <input
                        className='radio-group-in'
                        type="radio"
                        value="jobseeker"
                        checked={role === 'jobseeker'}
                        onChange={() => setUserType('jobseeker')}
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

                {role==="jobseeker" && action==="Sign Up"?<div className='inputss'>
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
                </div>:role==="employer" && action==="Sign Up"?<div className='inputss'>
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