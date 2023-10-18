// JobList.js
import React from 'react';
import "../../styles/Job/JobListingPage.css"
import { Link } from 'react-router-dom';

function JobList({ jobs, searchQuery }) {

  console.log(jobs);
  const filteredJobs = jobs.filter(
    (job) =>
      job.user.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.jobRequirements.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  

  return (
    <div className='job-list'>
      {filteredJobs.map((job) => (
        <div className='job-card' key={job.jobId}>
          <p>{job.jobId}</p>
          <h3>{job.jobTitle}</h3>
          <p>Company: {job.user.companyName}</p>
          <p>Requirements: {job.jobRequirements}</p>
          <Link to={`/job/${job.jobId}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
}

export default JobList;
