import React, { useState, useEffect } from "react";

function NotificationsPage() {
  const [data, setData] = useState(null);
  const userId = localStorage.getItem("userId");
  const typeOfUser = localStorage.getItem("userType");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/notifications/${typeOfUser}/${userId}`);
      const result = await response.json();
      setData(result.data);
    };

    fetchData();
  }, [typeOfUser, userId]);

  const handleAccept = async (notificationId) => {
    const response = await fetch(`/notifications/accept/${notificationId}`);
    setData(
      data.filter(
        (notification) => notification.notification_id !== notificationId
      )
    );
  };

  const handleDecline = async (notificationId) => {
    const response = await fetch(`/notifications/decline/${notificationId}`);
    setData(
      data.filter(
        (notification) => notification.notification_id !== notificationId
      )
    );
  };

  return (
    <div>
      {data ? (
        data.map((notification) => (
          <div key={notification.notification_id}>
            <h2>{notification.notification_from}</h2>
            <p>{notification.notification_to}</p>
            <p>{notification.notification_type}</p>
            <button onClick={() => handleAccept(notification.notification_id)}>
              Accept
            </button>
            <button onClick={() => handleDecline(notification.notification_id)}>
              Decline
            </button>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default NotificationsPage;
