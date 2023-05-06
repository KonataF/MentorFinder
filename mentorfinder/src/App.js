import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [currentTime, setCurrentTime] = useState("Hello From React");

  useEffect(() => {
    fetch("/admin")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCurrentTime(data.time);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        ... no changes in this part ...
        <p>The current time is {currentTime}.</p>
      </header>
    </div>
  );
}

export default App;
