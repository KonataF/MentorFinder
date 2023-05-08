import { useLocation, useNavigate, Link, NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "../App.css";
import "../index.css";

export default async function Dashboard() {
  const [data, setData] = useState(null);
  const userId = localStorage.getItem("userId");
  const typeOfUser = localStorage.getItem("userType");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/profile/${typeOfUser}/${userId}`);
      const result = await response.json();
      console.log(result);
      setData(result.data);
    };

    fetchData();
  }, [typeOfUser, userId]);

  // console.log(`data is ${data["fname"]}`);
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
            <h4>{}</h4>
            <h4>{}</h4>
            <h4>Education</h4>
            <br></br>
            <Link to="/communityhub">
              <button className="rounded-full bg-white text-purple-500 py-2 px-4 mb-4">
                Community Hubs
              </button>
            </Link>
            <Link to="/mymentors">
              <button className="rounded-full bg-white text-purple-500 py-2 px-4 mb-4">
                My Mentors
              </button>
            </Link>
          </div>
          <div className="w-1/2 bg-gray-200 rounded-lg px-4 py-4 mx-2 text-center">
            <h2 className="text-2xl font-bold mb-4">Column 2</h2>
            <p>Find one today!</p>
            <Link to="/findmentors">
              <button className="rounded-full bg-white text-purple-500 text-white py-2 px-4 mt-4">
                Connect Here
              </button>
            </Link>
          </div>
          <div className="w-1/4 bg-gray-200 rounded-lg px-4 py-4 mx-2 text-center">
            <h2 className="text-2xl font-bold mb-4">Column 3</h2>
            <div className="flex flex-col space-y-4 py-4">
              <div className="bg-white rounded-lg px-4 py-6 flex flex-col justify-center">
                <p className="font-bold text-center">Name</p>
                <p className="text-center">Occupation</p>
                <p className="text-center">Education</p>
                <div className="flex-grow"></div>
              </div>
              <div className="bg-white rounded-lg px-4 py-6 flex flex-col justify-center">
                <p className="font-bold text-center">Name</p>
                <p className="text-center">Occupation</p>
                <p className="text-center">Educatoin</p>
                <div className="flex-grow"></div>
              </div>
              <div className="bg-white rounded-lg px-4 py-6 flex flex-col justify-center">
                <p className="font-bold text-center">Name</p>
                <p className="text-center">Occupation</p>
                <p className="text-center">Education</p>
                <div className="flex-grow"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
