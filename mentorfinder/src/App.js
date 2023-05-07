import "./App.css";
import Navbar from "./Navbar";
import React, { useState } from "react";
import FindMentor from "./pages/FindMentor";
import MyMentors from "./pages/MyMentors";
//import Home from './pages/Home';
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Route, Routes } from "react-router-dom";
import DashboardLeftColumn from "./pages/DashboardLeftColumn";
import DashboardMiddleColumn from "./pages/DashboardMiddleColumn";
import DashboardRightColumn from "./pages/DashboardRightColumn";
import CommunityHubLeftColumn from "./pages/CommunityHubLeftColumn";
import CommunityHubRightColumn from "./pages/CommunityHubRightColumn";


export function App() {
  const [currentForm, setCurrentForm] = useState("login");


  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  const DashboardLayout = () => {
    return (
      <div>
        <div style={{ display: "flex" }}>
          <DashboardLeftColumn />
          <DashboardMiddleColumn />
          <DashboardRightColumn />
        </div>
      </div>
    );
  };

  const CommunityHubLayout = () => {
    return (
      <div>
        <CommunityHubLeftColumn />
        <CommunityHubRightColumn />
      </div>
    );
  };

  const MyMentorLayout = () => {
    return <div></div>;
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          {/* need to figure out a way to re-rounte to dashboard page when you click Site Name */}
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/dashboard" element={<DashboardLayout />} />
          <Route path="/findmentor" element={<FindMentor />} />
          <Route path="/mymentors" element={<MyMentors />} />
        </Routes>
      </div>

      <div className="App">
        {currentForm === "login" ? (
          <Login onFormSwitch={toggleForm} />
        ) : (
          <Register onFormSwitch={toggleForm} />
        )}
      </div>
      <div className="menu-container">
        <div className="menu_trigger"></div>
        <div className="educationDropdown">
          <h3>
            {" "}
            Unused <br />
            <span></span>
          </h3>
          <ul>
            <DropdownItem />
          </ul>
        </div>
      </div>
    </>
  );
}
function DropdownItem(props) {
  return (
    //**Not sure what is going on here */
    // <li className = 'dropdownItem'></li>
    // <img></img>
    //   <a> [props.text] </a>
    <p>sample text</p>
  );
}

export default App;
