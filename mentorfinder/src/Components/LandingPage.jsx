import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import Navbar from "./Navbar";
//import Navbar from "./NavbarSydney";

const Home = () => {
  return (
    <div>
      <Navbar />
      <h1>Welcome to My App</h1>
      <p>Please choose an option below:</p>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/signup">
        <button>Signup</button>
      </Link>
    </div>
  );
};

export default Home;
