import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Navbar from "./Navbar";
import "../App.css";
import "../index.css";

export default function Dashboard() {
  return (
    <div>
      <Navbar />
      <div
        className="h-screen flex flex-col"
        style={{ fontFamily: "montserrat" }}
      >
        <div className="flex-1 max-h-full flex flex-row bg-gray-100 pt-4">
          <div className="w-1/4 bg-gray-200 rounded-lg px-4 py-4 mx-2 text-center">
            <h2 className="text-2xl font-bold mb-4">Profile</h2>
            <h4>Name</h4>
            <h4>Occupation</h4>
            <h4>Education</h4>
            <br></br>
            <Link to="/communityhub">
              <button className="rounded-full bg-blue-500 text-white py-2 px-4 mb-4">
                Community Hubs
              </button>
            </Link>
            <Link to="/mymentors">
              <button className="rounded-full bg-blue-500 text-white py-2 px-4 mb-4">
                My Mentors
              </button>
            </Link>
          </div>
          <div className="w-1/2 bg-gray-300 rounded-lg px-4 py-4 mx-2 text-center">
            <h2 className="text-2xl font-bold mb-4">Column 2</h2>
            <p>Connect with a Mentor Today</p>
            <Link to="/findmentors">
              <button className="rounded-full bg-blue-500 text-white py-2 px-4 mt-4">
                Connect Here
              </button>
            </Link>
          </div>
          <div className="w-1/4 bg-gray-200 rounded-lg px-4 py-4 mx-2 text-center">
            <h2 className="text-2xl font-bold mb-4">Column 3</h2>
            <div className="flex flex-col space-y-4 py-4">
              <div className="bg-gray-400 rounded-lg px-4 py-6 flex flex-col justify-center">
                <p className="font-bold text-center">Name</p>
                <p className="text-center">Occupation</p>
                <p className="text-center">Education</p>
                <div className="flex-grow"></div>
              </div>
              <div className="bg-gray-400 rounded-lg px-4 py-6 flex flex-col justify-center">
                <p className="font-bold text-center">Name</p>
                <p className="text-center">Occupation</p>
                <p className="text-center">Educatoin</p>
                <div className="flex-grow"></div>
              </div>
              <div className="bg-gray-400 rounded-lg px-4 py-6 flex flex-col justify-center">
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
