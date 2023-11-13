import React from 'react'
import "../../styles/Job/JobListingPage.css"
import "../../styles/Job/JobListingPage.css"

function JobApplicationList({applications}){
    return (
        <div className='job-list'>
          {applications.map((application) => (
            <div className='job-card' key={application.applicationId}>
              <h3 className='text'>{application.jobTitle}</h3>
              <p className='text'>{application.firstName+" "+application.lastName}</p>
              <p className='text'>{application.status}</p>
              <p className='text'>{application.date}</p>
              <p className='text'>{application.coverLetter}</p>
            </div>
          ))}
        </div>
      );
}

export default JobApplicationList;