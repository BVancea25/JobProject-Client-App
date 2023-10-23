import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../../styles/Job/JobDetails.css";
import axiosPrivate from '../Authentication/PrivateAxios';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function JobDetailPage() {

    const {id}=useParams();
    const [job,setJob]=useState();
    const status='pending';
    const [coverLetter,setCover]=useState('');

    useEffect(() => {
        axios
          .get(`http://localhost:8080/job/${id}`)
          .then((res)=>{
            
            setJob(res.data);
          })
          .catch((err)=>{
            console.error(err);
          })
      },[id]);

    const handleApplication= ()=>{
     try{
      axiosPrivate
        .post(`http://localhost:8080/application/${id}`,{
          coverLetter,
          status
        })
        .then((res)=>{
          console.log(res);
          toast.success("Posted application succssesfuly");
        })
        .catch((err)=>{
          console.log(err);
          toast.error("Something went wrong");
        });
     }catch(error){
      console.error(error);
      toast.error("Something went wrong");
     }
    }

    const handleCoverChange=(event)=>{
      setCover(event.target.value);
    }
    
    if(job===undefined){
      return null;
    }
    
 return (

    <div className='wrapper'>
      <div className='job-detail-container'>
        <h1 className='job-title'>{job.jobTitle}</h1>
        <p className='company-name'>Company: {job.user.companyName}</p>
        <p className='requirements'>Description: {job.jobDescription}</p>
        <p className='requirements'>Requirements: {job.jobRequirements}</p>
        <p className='requirements'>Posting Date:{job.date}</p>
        <input type='text' value={coverLetter} placeholder='Write a cover letter !!!' onChange={handleCoverChange}></input>
        <div onClick={handleApplication}>Send Application</div>
        <ToastContainer autoClose={3000}/>
      </div>
    </div>
  );
}

export default JobDetailPage;
