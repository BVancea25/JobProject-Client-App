// JobListingPage.js
import React, { useEffect, useState } from 'react';
import JobEmployerList from '../JobEmployerComponents/JobsEmployerList';
import "../../styles/Job/JobListingPage.css"
import useAxiosPrivate from '../Authentication/PrivateAxios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function JobListingPage() {
  const [jobs, setJobs] = useState([]);
  const axiosPrivate=useAxiosPrivate();
  useEffect(() => {
    axiosPrivate
      .get("http://localhost:8080/jobs")
      .then((res)=>{
        console.log(res);
        setJobs(res.data);
      })
      .catch((err)=>{
        console.error(err);
      })
  }, []);

  useEffect(() => {
    // Retrieve and show the login message
    const loginMessage = localStorage.getItem("LoginMessage");
    if (loginMessage) {
      toast.success(loginMessage);
      // Clear the message from local storage if needed
      localStorage.removeItem("LoginMessage");
    }
  }, []);

  return (
    <div className='job-listing-page'>
      
      <h1 className='page-title'>Posted jobs by you</h1>
      <JobEmployerList jobs={jobs}/>
      <ToastContainer autoClose={3000}/>
    </div>
  );
}

export default JobListingPage;