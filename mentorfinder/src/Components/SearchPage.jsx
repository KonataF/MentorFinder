import React, { useState } from "react";
import SearchResultCard from "./SearchResultCard";

function SearchPage() {
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
    console.log(result.data);
    setSearchResult(result.data);
  };

  const handleButtonClick = (fname) => {
    console.log(`Clicked object with id : ${fname}`);
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
