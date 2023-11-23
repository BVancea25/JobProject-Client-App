// JobListingPage.js
import React, { useEffect, useState } from 'react';
import SearchBar from '../SearchBar';
import JobList from './JobList';
import "../../styles/Job/JobListingPage.css"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function JobListingPage() {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios
      .get("http://localhost:8080/job")
      .then((res)=>{
        console.log(res.data);
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
      
      <h1 className='page-title'>Available Jobs</h1>
      <SearchBar onSearch={setSearchQuery} />
      <JobList jobs={jobs} searchQuery={searchQuery} />
      <ToastContainer autoClose={3000}/>
    </div>
  );
}

export default JobListingPage;