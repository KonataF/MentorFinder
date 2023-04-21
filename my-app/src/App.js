import './App.css';
import Navbar from './Navbar';
import React, { useState } from "react";
import Dashboard from './pages/Dashboard';
import FindMentor from './pages/FindMentor';
import MyMentors from './pages/MyMentors';
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Route, Routes } from "react-router-dom"

export function App() {
  // const [currentForm, setCurrentForm] = useState('login');

  // const toggleForm = (formName) => {
  //   setCurrentForm(formName);
  // }

  return (
    <>
    
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/findmentor" element={<FindMentor />} />
          <Route path="/mymentors" element={<MyMentors />} />
          <Route path="/login" element={<Login />}/>
        </Routes>
      </div>

      {/* <div className="App">
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
      }
      </div> */}
      {/* <div className="menu-container">
        <div className="menu_trigger">

      </div> */}
        {/* <div className="educationDropdown">
          <h3> Unused <br/><span></span></h3>
          <ul>
            <DropdownItem/>
          </ul>
        </div>
      </div> */}

    
    </>
  )
}
// function DropdownItem(props) {
//   return(
//     //**Not sure what is going on here */
//     // <li className = 'dropdownItem'></li>
//     // <img></img>
//     //   <a> [props.text] </a>
//     <p>sample text</p>
//   );
// }

export default App;
