import React, {useState} from 'react';
import './style.css'

function SignUpMentor() {
    return(
      <div className="form">
          <div className="form-body">
              <div className="username">
                  <label className="form__label" for="Name">Name </label>
                  <input className="form__input" type="text" id="name" placeholder="Name"/>
              </div>
              <div className="email">
                  <label className="form__label" for="email">Email </label>
                  <input  type="email" id="email" className="form__input" placeholder="Email"/>
              </div>
              <div className="password">
                  <label className="form__label" for="password">Password </label>
                  <input className="form__input" type="password"  id="password" placeholder="Password"/>
              </div>
              <div className="bio">
                  <label className="form__label" for="bio">Bio </label>
                  <textarea id="bio" rows="4" cols="30"></textarea>
              </div>
              <div className="experience">
                  <label className="form__label" for="bio">Experience </label>
                  <textarea id="bio" rows="4" cols="30"></textarea>
              </div>
             
          </div>
          <div class="footer">
              <button type="submit" class="btn">Register</button>
          </div>
      </div>      
    )       
}

export default SignUpMentor;