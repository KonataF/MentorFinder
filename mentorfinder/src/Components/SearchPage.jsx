import React, { useState } from "react";
import SearchResultCard from "./SearchResultCard";
import { useLocation, useNavigate } from "react-router-dom";

function SearchPage() {
  const { state } = useLocation();
  console.log(state);
  const userData = state.userData;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("degree");
  const [searchResult, setSearchResult] = useState(null);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRadioChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleSearch = async () => {
    // Perform search based on searchTerm and searchType
    console.log(`Searching for ${searchTerm} in ${searchType}`);
    const response = await fetch(`api/search?${searchType}=${searchTerm}`);
    const result = await response.json();
    //console.log(result.data["fname"]);
    setSearchResult(result.data);
  };

  const handleButtonClick = async (_id) => {
    console.log(`Clicked object with id : ${_id}`);
    const currentUserId = userData["_id"]["$oid"];
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
      <input type="text" value={searchTerm} onChange={handleInputChange} />
      <div>
        <label>
          <input
            type="radio"
            value="education"
            checked={searchType === "education"}
            onChange={handleRadioChange}
          />
          Education
        </label>
        <label>
          <input
            type="radio"
            value="degree"
            checked={searchType === "degree"}
            onChange={handleRadioChange}
          />
          Degree
        </label>
        <label>
          <input
            type="radio"
            value="school"
            checked={searchType === "school"}
            onChange={handleRadioChange}
          />
          School
        </label>
        <label>
          <input
            type="radio"
            value="occupation"
            checked={searchType === "occupation"}
            onChange={handleRadioChange}
          />
          Occupation
        </label>
      </div>
      <button onClick={handleSearch}>Search</button>
      {searchResult &&
        searchResult.map((result) => (
          <SearchResultCard
            key={result.email}
            data={result}
            onButtonClick={handleButtonClick}
          />
        ))}
    </div>
  );
}

export default SearchPage;
