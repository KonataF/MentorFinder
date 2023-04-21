import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("mentor");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      firstName,
      lastName,
      email,
      password,
      userType,
    };
    console.log(data);
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);
    const isRegistered = result["registered"];
    console.log(`registered ${isRegistered}`);
    const userId = result["objectId"];
    if (isRegistered) {
      const response = await fetch(`/profile/${userType}/${userId}`);
      const result = await response.json();
      console.log(result.data);
      const userData = result.data;
      if (userData) {
        navigate("/editProfile", { state: { userData } });
      }
    }
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="Mentor">
          Mentor
          <input
            type="radio"
            id="Mentor"
            name="userType"
            value="Mentor"
            checked={userType === "Mentor"}
            onChange={handleUserTypeChange}
          />
        </label>
        <label htmlFor="Mentee">
          Mentee
          <input
            type="radio"
            id="Mentee"
            name="userType"
            value="Mentee"
            checked={userType === "Mentee"}
            onChange={handleUserTypeChange}
          />
        </label>
      </div>
      <label htmlFor="firstName"> First Name </label>
      <input
        type="text"
        id="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <label htmlFor="lastName"> Last Name </label>
      <input
        type="text"
        id="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <label htmlFor="email"> Email </label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password"> Password </label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit"> Submit </button>
    </form>
  );
};

export default SignupForm;
