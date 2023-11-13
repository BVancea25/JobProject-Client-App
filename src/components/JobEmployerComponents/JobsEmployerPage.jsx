// JobListingPage.js
import React, { useEffect, useState } from 'react';
import JobEmployerList from '../JobEmployerComponents/JobsEmployerList';
import "../../styles/Job/JobListingPage.css"
import useAxiosPrivate from '../Authentication/PrivateAxios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JobInputForm from "./JobInputForm";
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
function JobListingPage() {
  const [jobs, setJobs] = useState([]);
  const axiosPrivate=useAxiosPrivate();
  const { auth } = useAuth();
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs=()=>{
    axiosPrivate
      .get("http://localhost:8080/jobs",{      
          headers:{
            'Authorization': `Bearer `+auth.jwt
          }
        }   
       )
      .then((res)=>{
        console.log(res);
        setJobs(res.data);
      })
      .catch((err)=>{
        console.log(auth.jwt+" "+auth.role)
        console.error(err);
      })
  }

  useEffect(() => {
    // Retrieve and show the login message
    const loginMessage = localStorage.getItem("LoginMessage");
    if (loginMessage) {
      toast.success(loginMessage);
      // Clear the message from local storage if needed
      localStorage.removeItem("LoginMessage");
    }
  }, []);

  const deleteJob=(jobId)=>{
    axiosPrivate.delete(`http://localhost:8080/job/${jobId}`,{
      headers:{
        'Authorization': `Bearer `+auth.jwt
      }
    })
    .then(()=>{
      fetchJobs();
    })
    .catch((err)=>{
      console.error(err);
    })
  }

  const addJob=(newJob)=>{
    axiosPrivate.post("http://localhost:8080/job", {
      jobDescription:newJob.jobDescription,
      jobTitle:newJob.jobTitle,
      jobRequirements:newJob.jobRequirements
    },{
      headers:{
        'Authorization': `Bearer `+auth.jwt
      }
    })
    .then(()=>{
      fetchJobs();
    })
    .catch((err)=>{
      console.error(err);
    })
  }

  return (
    <div className='job-listing-page'>
      
      <h1 className='page-title'>Posted jobs by you</h1>
      <JobEmployerList deleteJob={deleteJob} jobs={jobs}/>
      <JobInputForm onAddJob={addJob}/>
      <ToastContainer autoClose={3000}/>
    </div>
  );
}

export default JobListingPage;