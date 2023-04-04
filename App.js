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

    </>
  )
}

export default App;
