import React, { useState } from "react";

function NotificationsPage() {
  const [data, setData] = useState(null);
  const userId = localStorage.getItem("userId");
  const typeOfUser = localStorage.getItem("userType");
  console.log(userId, typeOfUser);

  const fetchData = async () => {
    const response = await fetch(`/notifications/${typeOfUser}/${userId}`);
    const result = await response.json();
    setData(result);
    console.log(result.data);
  };

  useState(() => {
    fetchData();
  }, []);

  return (
    <div>
      {data ? (
        <div>
          <h2>{data.title}</h2>
          <p>{data.message}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default NotificationsPage;
