import React from react
import ReactDOM from 'react-dom/client'
import React, { useState} from 'react';
import './index.css'
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
                    <div className="fullName">
                        <label className="form_label" for="fullName">John Doe</label>
                        <input type="fullName" id="fullName" classname="form_input" placeholder="fullName"/>
                    </div>
                     <div className="email">
                        <label className="form__label" for="email">johndoe@email.com</label>
                        <input  type="email" id="email" className="form__input" placeholder="email"/>
                    </div>
                    <div className="password">
                        <label className="form_label" for="password">********</label>
                        <input type="password" id="password" className="form_input" placeholder="password"/>
                    </div>  
                    <div className="dateOfBirth">
                        <label className="form_label" fpr="dateOfBirth">01/01/1995</label>
                        <input type="dateOfBirth" id="dateOfBirth" className="form_input" placeholder="dateOfBirth"/>
                    </div>
                    <div className="occupation">
                        <label className="form_label" for="occupation">Programmer</label>
                        <input type="occupation" id="occupation" className="form_input" placeholder="occupation"/>
                    </div> 
                    <div className="education">

                    </div>
         </div>
        </div>
    </div>
    </div>
    )
}
