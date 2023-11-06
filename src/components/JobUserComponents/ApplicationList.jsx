
import React from 'react';
import "../../styles/Job/JobListingPage.css"

import "../../styles/Job/JobListingPage.css"
import { Navigate } from 'react-router-dom';

function ApplicationList({ applications}) {
 

  return (
    <div className='job-list'>
      {applications.map((application) => (
        <div className='job-card' key={application.applicationId}>
          <h3 className='text'>{application.companyName}</h3>
          <p className='text'>Company: {application.jobTitle}</p>
          <p className='text'>Requirements: {application.applicationStatus}</p>
          
        </div>
      ))}
    </div>
  );
}

export default ApplicationList;
