import React, { useState } from "react";
import "../App.css";

function SearchUser({ placeholder, data }) {
    const [filteredData, setFilteredData] = useState([]);
  
    const handleFilter = (e) => {
      const inputWord = e.target.value;
      const newFilter = data.filter((value) => {
        const isProfileComplete = value.isProfileComplete || false;
  
        return (
          (isProfileComplete &&
            value.username.includes(inputWord)) ||
          value.occupation.position.includes(inputWord) ||
          value.occupation.company.includes(inputWord) ||
          value.education.college.includes(inputWord) ||
          value.education.degree.includes(inputWord) ||
          value.education.discipline.includes(inputWord)
        );
      });
      
      if (inputWord === "") {
        setFilteredData([]);
      } else {
        setFilteredData(newFilter);
      }
    }; 
 

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          onChange={handleFilter}
        ></input>
      </div>
      {filteredData.length === 0 ? (
        <div className="noMatches">No matches</div>
      ) : (
        <div className="dataResult">
          {filteredData.map((value, key) => {
            return (
              <a className="dataItem">
                <p>{value.username}</p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchUser;