import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const CommunityHubs = () => {
  const [hubData, setHubData] = useState([]);
  let userId = localStorage.getItem("userId");
  const typeOfUser = localStorage.getItem("userType");
  userId = "64500f395a232e2e59ed1990";

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/showHubsMemberOf/${typeOfUser}/${userId}`);
      const result = await response.json();
      console.log(result);
      setHubData(result.data);
    };

    fetchData();
  }, [typeOfUser, userId]);

  if (!hubData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div
        className="flex flex-col items-center"
        style={{
          height: "calc(100vh - 1rem)",
          marginTop: "4rem",
          fontFamily: "montserrat",
        }}
      >
        <div className="rounded-lg bg-gray-200 p-10">
          <h1 className="text-4xl font-bold mb-4 text-center">Hello</h1>
          {hubData.map((hub) => (
            <div
              key={hub._id.$oid}
              className="rounded-full bg-white text-purple-500 text-white py-2 px-4 mt-4"
            >
              <Link to={`/communityHubsSelect/${hub._id.$oid}`}>
                <img src={hub.bannerPhoto} alt={hub.hubName} />
                <div className="">
                  <h5 className="card-title">{hub.hubName}</h5>
                  <p className="card-text">{hub.description}</p>
                  <p className="card-text">
                    <small className="text-muted">{hub.tags.join(", ")}</small>
                  </p>
                  <button class="rounded-full bg-white text-purple-500 py-2 px-4">
                    Go to Community Hub
                  </button>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityHubs;
