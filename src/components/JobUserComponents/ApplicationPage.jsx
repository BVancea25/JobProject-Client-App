// JobListingPage.js
import React, { useEffect, useState } from 'react';

import "../../styles/Job/JobListingPage.css"
import useAxiosPrivate from '../Authentication/PrivateAxios';
import 'react-toastify/dist/ReactToastify.css';
import ApplicationList from './ApplicationList';

function ApplicationPage() {
  const [applications, setApplications] = useState([]);
  const axiosPrivate=useAxiosPrivate();
  useEffect(() => {
    axiosPrivate
      .get("http://localhost:8080/application/user")
      .then((res)=>{
        console.log(res);
        setApplications(res.data);
      })
      .catch((err)=>{
        console.error(err);
      })
  }, []);


  return (
    <div className='job-listing-page'>
      
      <h1 className='page-title'>Your applications</h1>
      <ApplicationList applications={applications}/>
    </div>
  );
}

export default ApplicationPage;