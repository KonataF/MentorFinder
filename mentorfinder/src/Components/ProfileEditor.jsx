import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const ProfileEditor = () => {
  const { state } = useLocation();
  const userType = state.userType;
  //   console.log(`State ${state.userType}`);
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [dob, setDob] = useState("");
  const [occupationPosition, setOccupationPosition] = useState("");
  const [occupationCompany, setOccupationCompany] = useState("");
  const [educationCollege, setEducationCollege] = useState("");
  const [educationDegree, setEducationDegree] = useState("");
  const [educationDiscipline, setEducationDiscipline] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
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
    };
    console.log(data);
    const response = await fetch("/api/build_profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);
    // make API request to update user profile with data
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username"> Username </label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="profilePic"> Profile Picture </label>
      <input
        type="file"
        id="profilePic"
        accept="image/*"
        onChange={(e) => setProfilePic(e.target.files[0])}
      />
      <label htmlFor="dob"> Date of Birth </label>
      <input
        type="date"
        id="dob"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
      />
      <label htmlFor="occupationPosition"> Occupation Position </label>
      <input
        type="text"
        id="occupationPosition"
        value={occupationPosition}
        onChange={(e) => setOccupationPosition(e.target.value)}
      />
      <label htmlFor="occupationCompany"> Occupation Company </label>
      <input
        type="text"
        id="occupationCompany"
        value={occupationCompany}
        onChange={(e) => setOccupationCompany(e.target.value)}
      />
      <label htmlFor="educationCollege"> Education College </label>
      <input
        type="text"
        id="educationCollege"
        value={educationCollege}
        onChange={(e) => setEducationCollege(e.target.value)}
      />
      <label htmlFor="educationDegree"> Education Degree </label>
      <input
        type="text"
        id="educationDegree"
        value={educationDegree}
        onChange={(e) => setEducationDegree(e.target.value)}
      />
      <label htmlFor="educationDiscipline"> Education Discipline </label>
      <input
        type="text"
        id="educationDiscipline"
        value={educationDiscipline}
        onChange={(e) => setEducationDiscipline(e.target.value)}
      />
      <button type="submit"> Save Profile </button>
    </form>
  );
};

export default ProfileEditor;
