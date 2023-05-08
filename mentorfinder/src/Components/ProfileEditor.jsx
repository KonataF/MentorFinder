import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const ProfileEditor = () => {
  // const { state } = useLocation();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const userType = localStorage.getItem("userType");
  let isProfileComplete = localStorage.getItem("isProfileComplete");
  //const userId = state.userData["_id"]["$oid"];
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [dob, setDob] = useState("");
  const [occupationPosition, setOccupationPosition] = useState("");
  const [occupationCompany, setOccupationCompany] = useState("");
  const [educationCollege, setEducationCollege] = useState("");
  const [educationDegree, setEducationDegree] = useState("");
  const [educationDiscipline, setEducationDiscipline] = useState("");

  const handleSubmit = async (event) => {
    console.log(`Object Id is ${userId}, Profile COmplee ${userType}`);
    event.preventDefault();
    isProfileComplete = true;
    const data = {
      userId,
      username,
      profilePic,
      dob,
      userType,
      occupation: {
        position: occupationPosition,
        company: occupationCompany,
      },
      education: {
        college: educationCollege,
        degree: educationDegree,
        discipline: educationDiscipline,
      },
      isProfileComplete,
    };
    localStorage.setItem("userId", userId);
    localStorage.setItem("userType", userType);
    console.log(data);
    // make API request to update user profile with data
    const response = await fetch("/api/build_profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);
    const hasUpdated = result["updated"];
    if (hasUpdated) {
      const response = await fetch(`/profile/${userType}/${userId}`);
      const result = await response.json();
      console.log(result.data);
      const userData = result.data;
      //navigate("/dashboard", { state: { userData, userType } });
    }
  };

  return (
    <div>
      <Navbar />
      <div
        className="flex flex-col items-center text-center"
        style={{
          height: "calc(100vh - 1rem)",
          marginTop: "4rem",
          fontFamily: "montserrat",
        }}
      >
        <div className="rounded-lg bg-gray-100 p-8">
          <form onSubmit={handleSubmit}>
            <label htmlFor="username" className="px-2 py-2">
              {" "}
              Username{" "}
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border-2 border-gray-200 rounded-lg p-2 mb-2 mx-auto"
            />
            <br></br>
            <label htmlFor="profilePic" className="px-2 py-2">
              {" "}
              Profile Picture{" "}
            </label>
            <input
              type="file"
              id="profilePic"
              accept="image/*"
              onChange={(e) => setProfilePic(e.target.files[0])}
              className="border-2 border-gray-200 rounded-lg p-2 mb-2 mx-auto"
            />
            <br></br>
            <label htmlFor="dob" className="px-2 py-2">
              {" "}
              Date of Birth{" "}
            </label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="border-2 border-gray-200 rounded-lg p-2 mb-2 mx-auto"
            />
            <br></br>
            <label htmlFor="occupationPosition" className="px-2 py-2">
              {" "}
              Occupation Position{" "}
            </label>
            <input
              type="text"
              id="occupationPosition"
              value={occupationPosition}
              onChange={(e) => setOccupationPosition(e.target.value)}
              className="border-2 border-gray-200 rounded-lg p-2 mb-2 mx-auto"
            />
            <br></br>
            <label htmlFor="occupationCompany" className="px-2 py-2">
              {" "}
              Occupation Company{" "}
            </label>
            <input
              type="text"
              id="occupationCompany"
              value={occupationCompany}
              onChange={(e) => setOccupationCompany(e.target.value)}
              className="border-2 border-gray-200 rounded-lg p-2 mb-2 mx-auto"
            />
            <br></br>
            <label htmlFor="educationCollege"> Education College </label>
            <input
              type="text"
              id="educationCollege"
              value={educationCollege}
              onChange={(e) => setEducationCollege(e.target.value)}
              className="border-2 border-gray-200 rounded-lg p-2 mb-2 mx-auto"
            />
            <br></br>
            <label htmlFor="educationDegree"> Education Degree </label>
            <input
              type="text"
              id="educationDegree"
              value={educationDegree}
              onChange={(e) => setEducationDegree(e.target.value)}
              className="border-2 border-gray-200 rounded-lg p-2 mb-2 mx-auto"
            />
            <br></br>
            <label htmlFor="educationDiscipline" className="px-2 py-2">
              {" "}
              Education Discipline{" "}
            </label>
            <input
              type="text"
              id="educationDiscipline"
              value={educationDiscipline}
              onChange={(e) => setEducationDiscipline(e.target.value)}
              className="border-2 border-gray-200 rounded-lg p-2 mb-2 mx-auto"
            />
            <br></br>
            <button
              type="submit"
              className="rounded-full bg-white text-purple-500 py-2 px-4 mb-4"
            >
              {" "}
              Save Profile{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditor;
