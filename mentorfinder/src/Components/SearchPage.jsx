import React, { useState } from "react";

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("degree");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRadioChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleSearch = () => {
    // Perform search based on searchTerm and searchType
    console.log(`Searching for ${searchTerm} in ${searchType}`);
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
    </div>
  );
}

export default SearchPage;
