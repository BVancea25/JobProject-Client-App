// JobListingPage.js
import React, { useEffect, useState } from 'react';
import SearchBar from '../SearchBar';
import JobList from './JobList';
import "../../styles/Job/JobListingPage.css"
import axios from 'axios';

function JobListingPage() {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios
      .get("http://localhost:8080/job")
      .then((res)=>{
        
        setJobs(res.data);
      })
      .catch((err)=>{
        console.error(err);
      })
  }, []);

 

  return (
    <div className='job-listing-page'>
      <h1>Available Jobs</h1>
      <SearchBar onSearch={setSearchQuery} />
      <JobList jobs={jobs} searchQuery={searchQuery} />
    </div>
  );
}

export default JobListingPage;
