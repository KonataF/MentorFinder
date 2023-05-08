import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

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

  const handleAcceptOrDecline = async (notification_from, action) => {
    const response = await fetch(
      `/notifications/${action}/${userId}/${notification_from}`
    );
  };

  return (
    <div>
      <Navbar />
      <div
        className="flex flex-col items-center"
        style={{
          height: "calc(100vh - 1rem)",
          marginTop: "4rem",
          fontFamily: "montserrat",
        }}
      >
        <div className="rounded-lg bg-gray-100 p-8">
          {data ? (
            data.map((notification) => (
              <div key={notification.notification_id}>
                <h2>{notification.notification_from}</h2>
                <p>{notification.notification_to}</p>
                <p>{notification.notification_type}</p>
                <button
                  className="rounded-full bg-white text-purple-500 py-2 px-4"
                  onClick={() =>
                    handleAcceptOrDecline(
                      notification.notification_from,
                      "accept"
                    )
                  }
                >
                  Accept
                </button>
                <button
                  className="rounded-full bg-white text-purple-500 py-2 px-4"
                  onClick={() =>
                    handleAcceptOrDecline(
                      notification.notification_from,
                      "decline"
                    )
                  }
                >
                  Decline
                </button>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationsPage;
