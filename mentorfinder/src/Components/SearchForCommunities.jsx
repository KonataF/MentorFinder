import React, { useState } from "react";
import Navbar from "./Navbar";

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
    <div>
      <Navbar />
      <div
        className="flex flex-col items-center"
        style={{
          height: "calc(100vh - rem)",
          marginTop: "4rem",
          fontFamily: "montserrat",
        }}
      >
        <div className="rounded-lg bg-gray-100 p-8">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Search for community hubs:
          </h2>
          <form onSubmit={handleSearch} className="mb-4">
            <label htmlFor="searchName" className="text-lg">
              Search by name:
            </label>
            <br />
            <input
              type="text"
              id="searchName"
              name="searchName"
              value={searchName}
              onChange={(event) => setSearchName(event.target.value)}
              className="border-2 border-gray-400 rounded-lg p-2 mb-2 w-full"
            />
            <br />
            <br />
            <label htmlFor="searchKeyword" className="text-lg">
              Enter keywords or topics (separate keywords with commas):
            </label>
            <br />
            <input
              type="text"
              id="searchKeyword"
              name="searchKeyword"
              value={searchKeyword}
              onChange={(event) => setSearchKeyword(event.target.value)}
              className="border-2 border-gray-400 rounded-lg p-2 mb-2 mx-auto w-full"
            />
            <br />
            <br />
            <input
              type="submit"
              value="Submit"
              className="rounded-lg bg-white text-purple-500 px-4 py-2 font-bold"
            />
          </form>
        </div>

        <div className="rounded-lg bg-gray-100 p-8 mt-8 text-center items-center">
          <form action="/">
            <input
              type="submit"
              value="Interested in creating your own hub?"
              className="rounded-lg bg-white text-purple-500 px-4 py-2 font-bold mt-3 mx-auto"
            />
          </form>
          <p className="mt-5 text-center">Query Generated: {queryGenerated}</p>
          {errorMessage && <p>{errorMessage}</p>}
          <table className="table-auto border-collapse mt-4">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left font-bold">Hub Name</th>
                <th className="px-4 py-2 text-left font-bold">Member List</th>
                <th className="px-4 py-2 text-left font-bold"># of Members</th>
                <th className="px-4 py-2 text-left font-bold">Owner</th>
                <th className="px-4 py-2 text-left font-bold">Description</th>
                <th className="px-4 py-2 text-left font-bold">Tags</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={result.id}>
                  <td className="border px-4 py-2">{result.hubName}</td>
                  <td className="border px-4 py-2">{result.memberList}</td>
                  <td className="border px-4 py-2">{result.numberOfMembers}</td>
                  <td className="border px-4 py-2">{result.owner}</td>
                  <td className="border px-4 py-2">{result.description}</td>
                  <td className="border px-4 py-2">{result.tags}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CommunityHubSearch;
