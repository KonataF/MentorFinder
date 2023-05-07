import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function Dashboard() {
  let navigate = useNavigate();
  const { state } = useLocation();
  const userData = state.userData;
  console.log(userData);
  const routeChange = () => {
    let path = `/search`;
    navigate(path, { state: { userData } });
  };

  return (
    <div>
      <Navbar />
      <button onClick={routeChange}>Search</button>
    </div>
  );
}
