import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div
        className="flex flex-col items-center"
        style={{
          height: "calc(100vh - 1rem)",
          marginTop: "4rem",
          fontFamily: "montserrat",
        }}
      >
        <div className="rounded-lg bg-gray-100 p-8">
          <h1 className="text-4xl font-bold mb-4 text-center">Welcome</h1>
          <p className="text-lg mb-4">Please choose an option below:</p>
          <div className="flex space-x-4 justify-center">
            <Link to="/login">
              <button className="rounded-full bg-white text-purple-500 py-2 px-4">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="rounded-full bg-white text-purple-500 py-2 px-4">
                Signup
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
