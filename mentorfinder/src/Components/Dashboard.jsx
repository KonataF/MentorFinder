import { useLocation, useNavigate, Link, NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "../App.css";
import "../index.css";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [mentorData, setMentorData] = useState(null);
  const [menteeData, setMenteeData] = useState([]);
  const userId = localStorage.getItem("userId");
  const typeOfUser = localStorage.getItem("userType");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/profile/${typeOfUser}/${userId}`);
      const result = await response.json();
      console.log(result);
      setData(result.data);
    };

    const fetchMentorData = async () => {
      const response = await fetch(`/menteeList/${typeOfUser}/${userId}`);
      const result = await response.json();
      console.log(result);
      setMentorData(result.data);
    };

    fetchData(); //get data of current logged in user
    fetchMentorData(); // get current mentor or mentee list
  }, [typeOfUser, userId]);

  if (!data || !mentorData) {
    //console.log(mentorData);
    return <div>Loading...</div>;
  }

  return (
    <div class="bg-white">
      <Navbar />
      <div
        className="h-screen flex flex-col"
        style={{ fontFamily: "montserrat" }}
      >
        <div className="flex-1 max-h-full flex flex-row bg-gray-100 pt-4">
          <div className="w-1/4 bg-gray-200 rounded-lg px-4 py-4 mx-2 text-center">
            <h2 className="text-2xl font-bold mb-4">Profile</h2>
            {/* <img
              src="profile.jpeg"
              className="rounded-full mx-auto h-32 w-32 mb-4"
            ></img> */}
            <h4>{data["fname"]}</h4>
            <h4>{data["occupation"]["position"]}</h4>
            <h4>{data["education"]["degree"]}</h4>
            <br></br>
            <Link to="/searchCommunities">
              <button className="rounded-full bg-white text-purple-500 py-2 px-4 mb-4">
                Community Hubs Search
              </button>
            </Link>
            <Link to="/mymentors">
              <button className="rounded-full bg-white text-purple-500 py-2 px-4 mb-4">
                My Mentors
              </button>
            </Link>
          </div>

          <div className="w-1/2 bg-gray-200 rounded-lg px-4 py-4 mx-2 text-center">
            <img src="./assets/woman-portrait.png" alt="" />
            <h2 className="text-2xl font-bold mb-4">Search</h2>
            <p>Find one today!</p>
            <Link to="/searchUsers">
              <button className="rounded-full bg-white text-purple-500 text-white py-2 px-4 mt-4">
                Connect Here
              </button>
            </Link>
          </div>
          <div className="w-1/4 bg-gray-200 rounded-lg px-4 py-4 mx-2 text-center">
            <h2 className="text-2xl font-bold mb-4">My Connections</h2>
            <div className="flex flex-col space-y-4 py-4">
              <div className="bg-white rounded-lg px-4 py-6 flex flex-col justify-center">
                <p className="font-bold text-center">Adam Sandler</p>
                <p className="text-center">Actor</p>
                <p className="text-center">NYU</p>
                <div className="flex-grow"></div>
              </div>
              <div className="bg-white rounded-lg px-4 py-6 flex flex-col justify-center">
                <p className="font-bold text-center">Andrew Garfield</p>
                <p className="text-center">Software Engineer</p>
                <p className="text-center">NYU</p>
                <div className="flex-grow"></div>
              </div>
              <div className="bg-white rounded-lg px-4 py-6 flex flex-col justify-center">
                <p className="font-bold text-center">Rob Lee</p>
                <p className="text-center">Artists</p>
                <p className="text-center">Duke</p>
                <div className="flex-grow"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
