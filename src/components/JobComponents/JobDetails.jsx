import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
function JobDetailPage() {
    const {id}=useParams();
    const [job,setJob]=useState();
    useEffect(() => {
        axios
          .get(`http://localhost:8080/job/${id}`)
          .then((res)=>{
            console.log(res);
            setJob(res.data);
          })
          .catch((err)=>{
            console.error(err);
          })
      }, [id]);
    

  return (
    <div>
      <h1>{job.jobTitle}</h1>
      <p>Company: {job.user.companyName}</p>
      <p>Description: {job.jobDescription}</p>
      <p>Requirements: {job.jobRequirements}</p>
      <p>Posting Date:{job.date}</p>
      {}
    </div>
  );
}

export default JobDetailPage;
