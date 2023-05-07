import React, { useState } from "react";
import SearchResultCard from "./SearchResultCard";

const SearchBar = () => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [college, setCollege] = useState("");
  const [areaOfInterest, setAreaOfInterest] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const userType = localStorage.getItem("userType");

  const handleSubmit = async (e) => {
    //const searchType = "";

    // if (userType == "mentor") {
    //     const searchType = "Mentees";
    //   } else {
    //     const searchType = "Mentors";
    //   }

    e.preventDefault();
    const url = `/searchForMentors?name=${name}&company=${company}&position=${position}&college=${college}&areaOfInterest=${areaOfInterest}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setSearchResult(data.results);
      //console.log(searchResult);
      //console.log(searchResult[0].occupation.position);
      setErrorMessage("");
    } catch (error) {
      setSearchResult([]);
      setErrorMessage("An error occurred while fetching the data.");
    }
  };

  const handleButtonClick = async (_id) => {
    console.log(`Clicked object with id : ${_id}`);
    //const currentUserId = userData["_id"]["$oid"];
    const currentUserId = "64447ce5ea64efbbb467831f";
    const mentorId = _id;
    const data = {
      currentUserId,
      mentorId,
    };
    console.log(data);
    const response = await fetch("/api/push_notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);
    // Do something with the fname value
  };

  return (
    <div>
      <h1>Welcome!</h1>
      <h2>Search for Mentor/Mentee down below:</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <br />
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <br />
        <label htmlFor="company">Company</label>
        <br />
        <input
          type="text"
          id="company"
          name="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <br />
        <br />
        <label htmlFor="position">Position</label>
        <br />
        <input
          type="text"
          id="position"
          name="position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <br />
        <br />
        <label htmlFor="college">College</label>
        <br />
        <input
          type="text"
          id="college"
          name="college"
          value={college}
          onChange={(e) => setCollege(e.target.value)}
        />
        <br />
        <br />
        <label htmlFor="areaOfInterest">Area of Interest</label>
        <br />
        <select
          id="areaOfInterest"
          name="areaOfInterest"
          value={areaOfInterest}
          onChange={(e) => setAreaOfInterest(e.target.value)}
        >
          <option value=""></option>
          <option value="Arts">Arts</option>
          <option value="Science">Science</option>
          <option value="Math">Math</option>
          <option value="Humanities">Humanities</option>
          <option value="Business">Business</option>
        </select>
        <br />
        <br />
        <button onClick={handleSubmit}>Search</button>
        {searchResult &&
          searchResult.map((result) => (
            <SearchResultCard
              key={result.email}
              data={result}
              onButtonClick={handleButtonClick}
            />
          ))}
      </form>
    </div>
  );
};

export default SearchBar;
