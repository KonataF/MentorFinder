import React, { useState } from "react";
import ProfileEditor from "./ProfileEditor";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
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

    const isLoggedIn = result["loggedIn"];
    const userId = result["objectId"];

    localStorage.setItem("userId", userId);
    localStorage.setItem("userType", userType);
    localStorage.setItem("loggedIn", isLoggedIn);

    if (isLoggedIn) {
      const response = await fetch(`/profile/${userType}/${userId}`);
      const result = await response.json();
      console.log(result.data);
      const userData = result.data;
      console.log(userData["_id"]["$oid"]);
      if (userData["isProfileComplete"] === false) {
        userData["isProfileComplete"] = true;
        localStorage.setItem("isProfileComplete", true);
        console.log(userData["isProfileComplete"]);
        navigate("/editProfile", { state: { userData, userType } });
      } else {
        navigate("/dashboard", { state: { userData, userType } });
      }
    }
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  return (
    <>
      <div
        className="flex flex-col items-center"
        style={{
          height: "calc(100vh - 1rem)",
          marginTop: "4rem",
          fontFamily: "montserrat",
        }}
      >
        <div className="rounded-lg bg-gray-100 p-8">
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
            <button
              type="submit"
              class="rounded-full bg-white text-purple-500 py-2 px-4"
            >
              {" "}
              Submit{" "}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
