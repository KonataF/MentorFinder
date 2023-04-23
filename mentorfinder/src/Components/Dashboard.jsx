import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
      <button onClick={routeChange}>Search</button>
    </div>
  );
}
