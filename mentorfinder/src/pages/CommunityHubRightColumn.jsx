import "./CommunityHubRightColumn.scss"
import React, { useState, useEffect } from "react";


const CommunityHubRightColumn = () => {
    const [data, setData] = useState(null)
    const hubId = localStoratge.getItem("hubId")
    console.log(hubId)

    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch(`/communityhub/${hubId}`);
          const result = await response.json();
          setData(result.data);
          console.log(data);
        };

        fetchData()
    }, [hubId])
    return (
        <div className="rightColumn">
            <div className="container">
                <div className="communityHubCard">
                    <div className="community">
                        <h3>Community Hubs</h3> 
                        searchbar
                        <button>Follow</button>
                    </div>
                <div className="communityHubFollowingCard">
                    <h3>Following</h3>
                    <button entire button on click></button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default CommunityHubRightColumn
