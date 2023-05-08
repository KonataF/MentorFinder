import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import SignupForm from "./components/SignupForm";
import LandingPage from "./components/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import ProfileEditor from "./components/ProfileEditor";
import MyMentors from "./components/MyMentors";
import SearchPage from "./components/SearchPage";
import NotificationsPage from "./components/NotificationPage";
import SearchBar from "./components/SearchForUsers";
import CommunityHubSearch from "./components/SearchForCommunities";
import ModalComponent from "./components/Modal";
import CommunityHub from "./components/CommunityHubs";
import CommunityHubSelect from "./components/CommunityHubSelect";
import MyCommunityHubs from "./components/MyCommunityHubs";
import Logout from "./components/Logout";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/editProfile" element={<ProfileEditor />} />
        <Route path="/myMentors" element={<MyMentors />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/searchUsers" element={<SearchBar />} />
        <Route path="/searchCommunities" element={<CommunityHubSearch />} />
        <Route path="/post" element={<ModalComponent />} />
        <Route path="/communityHubsMain" element={<CommunityHub />} />
        <Route path="/communityHubsSelect" element={<CommunityHubSelect />} />
        <Route path="/myCommunityHubs" element={<MyCommunityHubs />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
