import React, { useState, useEffect } from "react";

function MyMentors() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let userType = localStorage.getItem("userType");
  let userId = localStorage.getItem("userId");
  userId = "64447ce5ea64efbbb467831f";
  useEffect(() => {
    // Fetch user data from API

    async function fetchData() {
      const response = await fetch(`/menteeList/Mentor/${userId}`);
      const data = await response.json();
      console.log(data.detailedData);
      setUsers(data.detailedData);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  function handleLogName(user) {
    console.log(`${user.fname} ${user.lname}`);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User List</h1>
      {users.map((user) => (
        <div key={user._id}>
          <h2>
            {user.fname} {user.lname}
          </h2>
          <p>Email: {user.email}</p>
          <p>Occupation: {user.occupation}</p>
          <p>School: {user.school}</p>
          <p>Degree: {user.degree}</p>
          <button onClick={() => handleLogName(user)}>Schedule Meeting</button>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default MyMentors;
