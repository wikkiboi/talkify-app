import { useState } from "react";

interface JoinSpaceModalProps {
  setShowModal: (show: boolean) => void;
}

export default function JoinSpaceModal({ setShowModal }: JoinSpaceModalProps) {
  const [serverId, setServerId] = useState("");

  const handleJoin = () => {
    console.log(`Joining server with ID: ${serverId}`);
    // API call to join server goes here
    setShowModal(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Join a Space</h2>
        <input
          type="text"
          placeholder="Enter Server ID"
          value={serverId}
          onChange={(e) => setServerId(e.target.value)}
          className="input-field"
        />
        <div className="modal-buttons">
          <button onClick={handleJoin} className="btn-primary">Join</button>
          <button onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
        </div>
      </div>
    </div>
  );
}
