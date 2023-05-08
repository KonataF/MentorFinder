import React, { useState } from "react";
import SearchResultCard from "./SearchResultCard";
import Navbar from "./Navbar";

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
      <Navbar />
      <div
        className="flex flex-col items-center"
        style={{
          height: "calc(100vh - 4rem)",
          marginTop: "4rem",
          fontFamily: "montserrat",
        }}
      >
        <div className="rounded-lg bg-gray-100 p-8">
          <h1 className="text-2xl font-bold mb-4 text-center">Welcome!</h1>
          <h2 className="text-1xl mb-4 text-center">
            Search for Mentor/Mentee down below:
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <label htmlFor="name" className="text-lg text-1xl">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-lg border-gray-300 border-2 px-4 py-2"
            />
            <label htmlFor="company" className="text-lg text-1xl">
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="rounded-lg border-gray-300 border-2 px-4 py-2"
            />
            <label htmlFor="position" className="text-lg text-1xl">
              Position
            </label>
            <input
              type="text"
              id="position"
              name="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="rounded-lg border-gray-300 border-2 px-4 py-2"
            />
            <label htmlFor="college" className="text-lg text-1xl">
              College
            </label>
            <input
              type="text"
              id="college"
              name="college"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              className="rounded-lg border-gray-300 border-2 px-4 py-2"
            />
            <label htmlFor="areaOfInterest" className="text-lg text-1xl">
              Area of Interest
            </label>
            <select
              id="areaOfInterest"
              name="areaOfInterest"
              value={areaOfInterest}
              onChange={(e) => setAreaOfInterest(e.target.value)}
              className="rounded-lg border-gray-300 border-2 px-4 py-2"
            >
              <option value=""></option>
              <option value="Arts">Arts</option>
              <option value="Science">Science</option>
              <option value="Math">Math</option>
              <option value="Humanities">Humanities</option>
              <option value="Business">Business</option>
            </select>
            <button
              onClick={handleSubmit}
              className="rounded-lg bg-white text-purple-500 px-4 py-2 font-bold"
            >
              Search
            </button>
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
      </div>
    </div>
  );
};

export default SearchBar;
