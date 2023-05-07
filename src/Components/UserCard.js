 import React from "react"
 import "./Card.css"
 import ProfileViewer from "./ProfileViewer"
 import { useState } from "react"

function UserCard({menteeName, profilePic, body}) {
    const {buttonPopup, setButtonPopup} = useState(false);

    return (
        <div className="card-container">
            <div className="profilePic-container">
                <img src={imageURL} alt='' />
            </div>
            <div className="card-name">
                <h3>{menteeName}</h3>
            </div>
            <div className="card-body">
                <p>{body}</p>
            </div>
            <div className="profileButton">
                <button onClick={() => setButtonPopup(true)}> View Profile </button>
                <ProfileViewer trigger={buttonPopup}>
                    <h3>Profile Viewer</h3>
                </ProfileViewer>
            </div>
        </div>
    )
}

 export default UserCard