import React from 'react'

function ProfileViewer(props, {profile}) {
    return (props.trigger) ? (
        <div className="form">
            <div className="form-body">
                <div className="fullName">
                </div>
                <div className="occupation">
                </div>
                <div className="=educationLevel">
                </div>
                <div className="experience">
                </div>
                <div className="bio">
                </div>
            <button className="close-button">close</button>
            {props.children}
            </div>
        </div>
    ) : ""
}

export default ProfileViewer