import { useState } from "react";

interface JoinSpaceModalProps {
  setModalType: React.Dispatch<React.SetStateAction<"create" | "join" | null>>;
  setShowOptionsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function JoinSpaceModal({
  setModalType,
  setShowOptionsModal,
}: JoinSpaceModalProps) {
  const [serverId, setServerId] = useState("");

  const handleJoin = () => {
    console.log(`Joining server with ID: ${serverId}`);
    // API call to join server goes here
    setModalType(null);
    setShowOptionsModal(false);
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
          <button onClick={handleJoin} className="btn-primary">
            Join
          </button>
          <button onClick={() => setModalType(null)} className="btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
