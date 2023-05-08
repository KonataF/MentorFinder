import React, { useState } from "react";
import "../App.css";
import "../index.css";

function ScheduleForm({ data, onButtonClick }) {
  const handleClick = () => {
    onButtonClick(data["_id"]["$oid"]);
  };

  return (
    <div className="flex justify-center" style={{ fontFamily: "montserrat" }}>
      <form className="w-1/2 bg-gray-300 rounded-lg px-4 py-4 mx-2">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Schedule Meeting
        </h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Name: {`${data.fname} ${data.lname}`}
          </label>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email: {data.email}
          </label>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Occupation: {data.occupation.position}
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="date">
            Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="date"
            name="date"
            type="date"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="time">
            Time
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="time"
            name="time"
            type="time"
            required
          />
        </div>
        <div className="flex justify-center">
          <button
            className="rounded-full bg-blue-500 text-white py-2 px-4"
            onClick={handleClick}
          >
            Schedule
          </button>
        </div>
      </form>
    </div>
  );
}

export default ScheduleForm;
