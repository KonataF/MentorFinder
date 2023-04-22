import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import SignupForm from "./Components/SignupForm";
import LandingPage from "./Components/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import Dashboard from "./Components/Dashboard";
import ProfileEditor from "./Components/ProfileEditor";
import MyMentors from "./Components/MyMentors";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/editProfile" element={<ProfileEditor />} />
        <Route path="/myMentors" element={<MyMentors />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
