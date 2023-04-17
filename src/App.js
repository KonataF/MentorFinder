<<<<<<< user_profile/10/syd
=======
<<<<<<< user_profile/10/syd
>>>>>>> main
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
<<<<<<< user_profile/10/syd
=======
=======
import './App.css';
import Navbar from './Navbar';
import React, { useState } from "react";
import Dashboard from './pages/Dashboard';
import FindMentor from './pages/FindMentor';
import MyMentors from './pages/MyMentors';
//import Home from './pages/Home';
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Route, Routes } from "react-router-dom"

export function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <>
    
      <Navbar />
      <div className="container">
        <Routes>
          {/* need to figure out a way to re-rounte to dashboard page when you click Site Name */}
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/findmentor" element={<FindMentor />} />
          <Route path="/mymentors" element={<MyMentors />} />
        </Routes>
      </div>

      <div className="App">
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
      }
      </div>
      <div className="menu-container">
        <div className="menu_trigger">

        </div>
        <div className="educationDropdown">
          <h3> Unused <br/><span></span></h3>
          <ul>
            <DropdownItem/>
          </ul>
        </div>
      </div>

    
    </>
  )
}
function DropdownItem(props) {
  return(
    //**Not sure what is going on here */
    // <li className = 'dropdownItem'></li>
    // <img></img>
    //   <a> [props.text] </a>
    <p>sample text</p>
>>>>>>> main
>>>>>>> main
  );
}

export default App;
