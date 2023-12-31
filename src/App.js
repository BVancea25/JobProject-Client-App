
import './App.css';
import LoginSignUp from './components/Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JobListingPage from './components/JobComponents/JobListingPage';
import JobDetails from './components/JobComponents/JobDetails';
import JobEmployerPage from "./components/JobEmployerComponents/JobsEmployerPage"
import Navbar from './components/NavBar/NavBar';
import RequireAuth from './components/Authentication/RequireAuth';
import ApplicationPage from './components/JobUserComponents/ApplicationPage';
import JobApplicationPage from './components/JobEmployerComponents/JobApplicationPage';
import CvViewer from "./components/CvViewer";
import Chat from "./components/Chat"
function App() {

  
  return (
    <div className="App">
      
      <Router>
          <Navbar/>
            <Routes>
              <Route path='/register' element={<LoginSignUp/>}/> 
              <Route path='/' element={<JobListingPage/>}/>
              
            <Route element={<RequireAuth allowedRole="[EMPLOYER]"/>}>
              <Route path='/jobs' element={<JobEmployerPage/>}/>
              <Route path='/application/employer' element={<JobApplicationPage/>}/>
              <Route path='/cv/:email' element={<CvViewer/>}/>
              <Route path='/chatE' element={<Chat/>}/>
              
            </Route>
            <Route element={<RequireAuth allowedRole="[USER]"/>}>
              <Route path='/application/user' element={<ApplicationPage/>}/>
              <Route path='/job/:id' element={<JobDetails/>}/>
              <Route path='/chatU' element={<Chat/>}/>
              
            </Route>
          </Routes>
      </Router>
      
      
    </div>
  );
}

export default App;
