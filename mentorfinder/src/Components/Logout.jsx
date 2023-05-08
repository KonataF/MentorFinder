import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      const response = await fetch("/logout");
      const result = await response.json();
      if (result.loggedOut == true) {
        localStorage.setItem("userId", null);
        localStorage.setItem("userType", null);
        localStorage.setItem("loggedIn", null);
        navigate("/");
      }
    };
    logout();
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
