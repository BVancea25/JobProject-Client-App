import React from 'react'
import { useState,useEffect } from 'react';
import useAxiosPrivate from '../Authentication/PrivateAxios';
import JobApplicationList from './JobApplicationList';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
function JobApplicationPage(){
  const nav=useNavigate();
  const {auth}=useAuth();
    const [applications, setApplications] = useState([]);
  const axiosPrivate=useAxiosPrivate();
  useEffect(() => {
    axiosPrivate
      .get("http://localhost:8080/application/employer",{
        headers:{
          'Authorization': `Bearer `+auth.jwt
        }
      })
      .then((res)=>{
        console.log(res.status);
        
        setApplications(res.data);
      })
      .catch((err)=>{
        if(err.response.status===403){
          nav('/register');
        }
        console.error(err);
      })
  }, []);

  if(applications===undefined){
    return null;
  }

  return (
    <div className='job-listing-page'>
      
      <h1 className='page-title'>Applications for your jobs</h1>
      <JobApplicationList applications={applications}/>
    </div>
  );
}

export default JobApplicationPage;