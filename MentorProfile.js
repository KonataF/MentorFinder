import React from react
import React, { useState} from 'react';
import './style.css'

// features:
// full name
// - email
// - username
// - password
// - profilePic (optional)
// - date of birth
// - occupation
// - education
// - experience
// - bio
// - maxNumOfMentees (optional)

<h2>Mentor Profile</h2>

const Profile = ()=>{
     return (
        <div>
            <div styyle={{
                display:"flex",
                justifyContent:"space-around",
                margin: "18px 0px"
            }}>
             <div className="form">
                 <div className="form-body">
                     <div className="email">
                        <label className="form__label" for="email">Email </label>
                        <input  type="email" id="email" className="form__input" placeholder="Email"/>
              
            </div>
         </div>
        </div>
    </div>
    </div>
    )
}
