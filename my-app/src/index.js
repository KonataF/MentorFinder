import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./styles.css"
import Dashboard from "./components/Dashboard"
import MyMentors from "./pages/MyMentors"
import { BrowserRouter, Route, Switch } from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(

  <BrowserRouter>
  <Switch>
    {/* <Route path="/" element={<LandingPage />} /> */}
    {/* <Route path="/login" element={<LoginForm />} />
    <Route path="/signup" element={<SignupForm />} /> */}
    <Route path="/dashboard" element={<Dashboard />} />
    {/* <Route path="/editProfile" element={<ProfileEditor />} /> */}
    <Route path="/myMentors" element={<MyMentors />} />
    {/* <Route path="/search" element={<SearchPage />} />
    <Route path="/notifications" element={<NotificationsPage />} />
    <Route path="/searchusers" element={<SearchBar />} />
    <Route path="/searchcommunities" element={<CommunityHubSearch />} />
    <Route path="/post" element={<ModalComponent />} /> */}
  </Switch>
  <App />
</BrowserRouter>
)


