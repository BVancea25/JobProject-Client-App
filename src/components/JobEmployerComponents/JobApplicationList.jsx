import React, { useState, useEffect } from 'react';
import "../../styles/Job/JobListingPage.css";
import "../../styles/Status.css";
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

import { Link } from 'react-router-dom';
function JobApplicationList({ applications }) {
  const { auth } = useAuth();
  const [updatedApplications, setUpdatedApplications] = useState([]);

  useEffect(() => {
    setUpdatedApplications(applications);
  }, [applications]);

  function getStatusClass(status) {
    if (status === 'accepted') {
      return 'text';
    } else if (status === 'rejected') {
      return 'rejected';
    } else {
      return 'pending';
    }
  }

  function updateStatus(status, applicationId) {
    axios.put(
      "http://localhost:8080/application/employer",
      {
        status: status,
        applicationId: applicationId,
      },
      {
        headers: {
          'Authorization': `Bearer ` + auth.jwt,
        },
      }
    )
    .then(()=>{
      const updatedApplicationData = {
        ...applications.find(app => app.applicationId === applicationId),
        status: status,
      };
  
      // Update the state with the new application data
      setUpdatedApplications(prevApplications => prevApplications.map(application => (
        application.applicationId === updatedApplicationData.applicationId
          ? updatedApplicationData
          : application
      )));
    })
    .catch(error => {
      console.error('Error updating status:', error);
    });
  }

  return (
    <div className='job-list'>
      {updatedApplications.map((application) => (
        <div className='job-card' key={application.applicationId}>
          <h3 className='text'>{application.jobTitle}</h3>
          <p className='text'>{application.firstName + " " + application.lastName}</p>
          <p className={`${getStatusClass(application.status)}`}>{application.status}</p>
          <p className='text'>{application.date}</p>
          <p className='text'>{application.coverLetter}</p>

          {application.status === 'pending' && (
            <div className='submit-container'>
              <button className="approved-btn" onClick={() => updateStatus("accepted", application.applicationId)}>
                Approve
              </button>
              <button className="rejected-btn" onClick={() => updateStatus("rejected", application.applicationId)}>
                Reject
              </button>
            </div>
          )}
          <Link to={`/cv/${application.userEmail}`}>CV</Link>
          <Link to={`/chat/${application.userEmail}`}>Send message</Link>
        
          
        </div>
      ))}
    </div>
  );
}

export default JobApplicationList;
