import React, { useState } from "react";

function CommunityHubSearch() {
  const [searchName, setSearchName] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [queryGenerated, setQueryGenerated] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = async (event) => {
    event.preventDefault();
    const response = await fetch(
      `/searchForCommunityHubs?name=${searchName}&keywords=${searchKeyword}`
    );
    const data = await response.json();
    if (response.ok) {
      setResults(data.results);
      setQueryGenerated(data.queryGenerated);
      setErrorMessage("");
    } else {
      setResults([]);
      setQueryGenerated("");
      setErrorMessage(data.error);
    }
  };

  return (
    <div id="container">
      <h1>Welcome!</h1>
      <h2>Search for community hubs:</h2>
      <form onSubmit={handleSearch}>
        <label htmlFor="searchName">Search by name:</label>
        <br />
        <input
          type="text"
          id="searchName"
          name="searchName"
          value={searchName}
          onChange={(event) => setSearchName(event.target.value)}
        />
        <br />
        <br />
        <label htmlFor="searchKeyword">
          Enter keywords or topics (separate keywords with commas):
        </label>
        <br />
        <input
          type="text"
          id="searchKeyword"
          name="searchKeyword"
          value={searchKeyword}
          onChange={(event) => setSearchKeyword(event.target.value)}
        />
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>
      <form action="/communityHubCreation">
        <input type="submit" value="Interested in creating your own hub?" />
      </form>
      <p>Query Generated: {queryGenerated}</p>
      {errorMessage && <p>{errorMessage}</p>}
      <table className="myTable">
        <thead>
          <tr>
            <th>Hub Name</th>
            <th>Member List</th>
            <th># of Members</th>
            <th>Owner</th>
            <th>Description</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.id}>
              <td>{result.hubName}</td>
              <td>{result.memberList}</td>
              <td>{result.numberOfMembers}</td>
              <td>{result.owner}</td>
              <td>{result.description}</td>
              <td>{result.tags}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CommunityHubSearch;
