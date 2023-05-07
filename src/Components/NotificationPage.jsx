import React, { useState, useEffect } from "react";

function NotificationsPage() {
  const [data, setData] = useState(null);
  const userId = localStorage.getItem("userId");
  const typeOfUser = localStorage.getItem("userType");
  console.log(userId, typeOfUser);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/notifications/${typeOfUser}/${userId}`);
      const result = await response.json();
      setData(result.data);
      console.log(data);
    };

    fetchData();
  }, [typeOfUser, userId]);

  return (
    <div>
      {data ? (
        data.map((notification) => (
          <div key={notification.notification_id}>
            <h2>{notification.notification_from}</h2>
            <p>{notification.notification_to}</p>
            <p>{notification.notification_type}</p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default NotificationsPage;
