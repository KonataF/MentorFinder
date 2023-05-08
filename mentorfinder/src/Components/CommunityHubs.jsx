import React, { useState, useEffect } from "react";
// import "./CommunityHubLeftColumn.css";
// import "./CommunityHubRightColumn.css";
import CommunityHubSearch from "./SearchForCommunities";

const CommmunityHubLeftColumn = () => {
  return (
    <div className="leftColumn">
      <div className="container mx-auto">
        <div className="featured"></div>
        <br></br>
        <h3 className="text-lg font-medium">Featured</h3>
        <img
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fclipground.com%2Fimages%2Fblack-rectangle-border-clipart-1.jpg&f=1&nofb=1&ipt=b076bb5ecce44680fa592a3ea5b3a93b4520e81398d6b97507e85f194796bef7&ipo=images"
          alt="featured"
          className="w-full h-auto"
        ></img>
      </div>
    </div>
  );
};

const CommunityHubRightColumn = () => {
  const [userHub, setHub] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const handleGetHub = async () => {
      const response = await fetch(`showHubsMemberOf/${userId}`);
      const data = await response.json();
      setHub(data);
    };
    handleGetHub();
  }, [userHub]);

  return <CommunityHubSearch />;
};

export default function CommunityHubs() {
  return (
    <div className="flex justify-center items-center">
      <CommmunityHubLeftColumn />
      <CommunityHubRightColumn />
    </div>
  );
}
