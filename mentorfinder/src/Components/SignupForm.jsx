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
        navigate("/editProfile", { state: { userData, userType } });
      }
    }
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center h-screen"
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Create an account
      </h1>
      <div className="flex items-center mb-8">
        <label htmlFor="Mentor" className="mr-4 cursor-pointer">
          <input
            type="radio"
            id="Mentor"
            name="userType"
            value="Mentor"
            checked={userType === "Mentor"}
            onChange={handleUserTypeChange}
            className="form-radio text-blue-600 h-4 w-4"
          />
          <span className="ml-2 text-gray-800 font-medium">Mentor</span>
        </label>
        <label htmlFor="Mentee" className="cursor-pointer">
          <input
            type="radio"
            id="Mentee"
            name="userType"
            value="Mentee"
            checked={userType === "Mentee"}
            onChange={handleUserTypeChange}
            className="form-radio text-blue-600 h-4 w-4"
          />
          <span className="ml-2 text-gray-800 font-medium">Mentee</span>
        </label>
      </div>
      <div className="mb-4 w-full">
        <label
          htmlFor="firstName"
          className="text-sm font-medium text-gray-800 mb-2 block"
        >
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="form-input w-full border-gray-300 shadow-sm focus:ring-blue-600 focus:border-blue-600"
        />
      </div>
      <div className="mb-4 w-full">
        <label
          htmlFor="lastName"
          className="text-sm font-medium text-gray-800 mb-2 block"
        >
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="form-input w-full border-gray-300 shadow-sm focus:ring-blue-600 focus:border-blue-600"
        />
      </div>
      <div className="mb-4 w-full">
        <label
          htmlFor="email"
          className="text-sm font-medium text-gray-800 mb-2 block"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input w-full border-gray-300 shadow-sm focus:ring-blue-600 focus:border-blue-600"
        />
      </div>
      <div className="mb-6 w-full">
        <label
          htmlFor="password"
          className="text-sm font-medium text-gray-800 mb-2 block"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input w-full border-gray-300 shadow-sm focus:ring-blue-600 focus:border-blue-600"
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default SignupForm;
