import React from 'react';
import { useState } from 'react';
import "../../styles/Login.css";
function JobInputForm({ onAddJob }) {
    const [newJob, setNewJob] = useState({
      jobTitle: "",
      jobDescription: "",
      jobRequirements: "",
    });
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onAddJob(newJob); // Call the parent component's addJob function
      // Clear the form or perform other necessary actions
      setNewJob({
        jobTitle: "",
        jobDescription: "",
        jobRequirements: "",
      });
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewJob({ ...newJob, [name]: value });
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <div className='container'>
          <div className='inputs'>
        <div className="form-group">
          <label style={{paddingRight:"10px"}} className='text' htmlFor="jobTitle">Job Title</label>
          <input
            
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={newJob.jobTitle}
            onChange={handleInputChange}
            required
          />
        </div>
  
        <div className="form-group">
          <label style={{paddingRight:"10px"}} className='text' htmlFor="jobDescription">Job Description</label>
          <input
            style={{marginRight:"60px"}}
            type="text"
            id="jobDescription"
            name="jobDescription"
            value={newJob.jobDescription}
            onChange={handleInputChange}
            required
          />
        </div>
  
        <div className="form-group">
          <label style={{paddingRight:"10px"}} className='text' htmlFor="jobRequirements">Job Requirements</label>
          <textarea
            style={{marginRight:"60px"}}
            id="jobRequirements"
            name="jobRequirements"
            value={newJob.jobRequirements}
            onChange={handleInputChange}
            required
          ></textarea>
          </div>
        </div>
        <div className='submit-container'>
          <button className='submit' type="submit">Add Job</button>
          </div>
        </div>
  
        
      </form>
    );
  }

export default JobInputForm;  