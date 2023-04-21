import React, { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("mentor");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      email,
      password,
      userType,
    };
    console.log(data);
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);
    console.log(result["loggedIn"]);
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

export default LoginForm;
