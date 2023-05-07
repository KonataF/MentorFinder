import { useState } from "react";
import Post from "./Post";

function ModalComponent() {
  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async () => {
    // Send data to endpoint
    await fetch("/api/endpoint", {
      method: "POST",
      body: JSON.stringify({ data: inputValue }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Close modal
    setShowModal(false);
  };

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Open Modal</button>
      {showModal && (
        {/* <div className="modal">
          <div className="modal-content">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
            />
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div> */}
        <Post/>
      )}
    </div>
  );
}

export default ModalComponent;
