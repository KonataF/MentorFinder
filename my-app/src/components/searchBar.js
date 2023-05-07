import React, { useState } from "react";
import "../App.css"

function SearchBar({placeholder, data}) {
  const [filteredData, setFilteredData] = useState([]);

  const handleFilter = (e) => {
  const inputWord = e.target.value;
  const newFilter = data.filter((value) => {
    // return value.title.toLowerCase()

    return value.title.toLowerCase().includes(inputWord.toLowerCase());
    // return value && value.title && value.title.toLowerCase().includes(inputWord.toLowerCase());
  })

  if (inputWord === "") {
    setFilteredData([]);
  } else{
    setFilteredData(newFilter);
  }
}

  return (
    <div className="search">
      <div className="searchInputs">
        <input type="text" placeholder={placeholder} onChange={handleFilter}></input>
      </div>
      {filteredData.length === 0 ? (
        <div className="noMatches">
          No matches
        </div>
        ) : (
        <div className="dataResult">
        {filteredData.map((value,key) => {
          return(
            <a className="dataItem" href={value.link}>
              <p>{value.title}</p>
            </a>
          );
        })}
      </div>
    )}
    </div>
  )  
}

export default SearchBar;
