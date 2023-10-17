import logo from './logo.svg';
import './App.css';
import LoginSignUp from './components/Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JobListingPage from './components/JobComponents/JobListingPage';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/register' element={<LoginSignUp/>}/> 
          <Route path='/' element={<JobListingPage/>}/>
        </Routes>
        
      </Router>
      
    </div>
  );
}

export default App;
