import '../index.css'
import '../App.css'
import React from 'react';


export default function Dashboard() {
  console.log("component loaded");
  return (
    <div className="dashboard">
      <div className="column small">
        <img src="../../profile.jpeg" alt="Profile Pic"></img>
        <h3>Name</h3>
        <h4>Occupation</h4>
        <h4>College</h4>
        <button>Go to Profile</button>
      </div>
      <div className="column big">
        <h2>Welcome back!</h2>
        <button>Find Mentor Today</button>
        <p></p>
        <button>Find a Communnity Hub</button>
      </div>
      <div className="column small">
        <h2>Column 3</h2>
        <p>Content for column 3 goes here</p>
      </div>
    </div>
  );
}
