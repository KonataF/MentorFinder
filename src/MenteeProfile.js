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
    const [open, setOpen] = useState(false)
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
                        <label className="form_label" for="fullName">Full Name</label>
                        <input type="fullName" id="fullName" classname="form_input" placeholder="fullName"/>
                    </div>
                     <div className="email">
                        <label className="form__label" for="email">Email</label>
                        <input  type="email" id="email" className="form__input" placeholder="email"/>
                    </div>
                    <div className="password">
                        <label className="form_label" for="password">Password</label>
                        <input type="password" id="password" className="form_input" placeholder="password"/>
                    </div>  
                    <div className="dateOfBirth">
                        <label className="form_label" for="dateOfBirth">Date of birth</label>
                        <input type="dateOfBirth" id="dateOfBirth" className="form_input" placeholder="dateOfBirth"/>
                    </div>
                    <div className="occupation">
                        <label className="form_label" for="occupation">Occupation</label>
                        <input type="occupation" id="occupation" className="form_input" placeholder="occupation"/>
                    </div> 
                    <div className="education_menu-container">
                        <div className="education_menu_trigger" onClick={()=>{setOpen(!open)}}>
                            <label text={"Education Level"}/>
                        </div>
                    </div>
                    <div className={`educationDropdown ${open? 'active' : 'inactive'}`} >
                        <ul>
                            <DropdownItem text={"High School Diploma"}/>
                            <DropdownItem text={"Associate's Degree"}/>
                            <DropdownItem text={"Bachelor's Degree"}/>
                            <DropdownItem text={"Master's Degree"}/>
                            <DropdownItem text={"Doctorate's Degree"}/>
                        </ul>
                    </div>
                    <div classname="experience">
                        <label className="form_label" for="experience">Experience</label>
                        <input type="experience" id="experience" className="form_input" placeholder="experience"/>
                    </div>
                    <div classname="bio">
                        <label className="form_label" for="bio">Bio</label>
                        <input type="bio" id="bio" className="form_input" placeholder="bio"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )

}
function DropdownItem(props) {
    return(
      <li className = 'dropdownItem'>
        <a> [props.text] </a>
        </li>
    );
  }
  
  export default App;
