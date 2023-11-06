// JobList.js
import React from 'react';
import "../../styles/Job/JobListingPage.css"

import "../../styles/Job/JobListingPage.css"
import { Navigate } from 'react-router-dom';

function JobList({ jobs}) {
  const navigate=()=>{
    return <Navigate to={"/ceva"}/>;
  }

  return (
    <div className='job-list'>
      {jobs.map((job) => (
        <div className='job-card' key={job.jobId}>
          <h3 className='text'>{job.jobTitle}</h3>
          <p className='text'>Company: {job.user.companyName}</p>
          <p className='text'>Requirements: {job.jobRequirements}</p>
          <button className='' onClick={navigate}>View Applications</button>
        </div>
      ))}
    </div>
  );
}

export default JobList;
