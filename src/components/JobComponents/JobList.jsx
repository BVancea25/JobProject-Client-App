// JobList.js
import React from 'react';
import "../../styles/Job/JobListingPage.css"
import { Link } from 'react-router-dom';
import "../../styles/Job/JobListingPage.css"
import useAuth from '../../hooks/useAuth';

function JobList({ jobs, searchQuery }) {
  const {auth}=useAuth();
  console.log(auth.userRole);
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
          <h3 className='text'>{job.jobTitle}</h3>
          <p className='text'>Company: {job.user.companyName}</p>
          <p className='text'>Requirements: {job.jobRequirements}</p>
          {auth.userRole!==undefined || auth.userRole!=="" ?<Link to={`/job/${job.jobId}`}>View Details</Link>:<Link to={`/register`}>Log In</Link>}
        </div>
      ))}
    </div>
  );
}

export default JobList;
