
import './App.css';
import LoginSignUp from './components/Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JobListingPage from './components/JobComponents/JobListingPage';
import JobDetails from './components/JobComponents/JobDetails';

import Navbar from './components/NavBar/NavBar';

function App() {
  return (
    <div className="App">
      
        <Router>
          <Navbar/>
          <Routes>
            <Route path='/register' element={<LoginSignUp/>}/> 
            <Route path='/' element={<JobListingPage/>}/>
            <Route path='/job/:id' element={<JobDetails/>}/>
          </Routes>
        </Router>
      
      
    </div>
  );
}

export default App;
