import { useState } from "react";

interface CreateChannelModalProps {
  handleCreateChannel: (newChannelName: string) => Promise<void>;
  showModal: (value: React.SetStateAction<boolean>) => void;
}

export default function CreateChannelModal({
  handleCreateChannel,
  showModal,
}: CreateChannelModalProps) {
  const [newChannelName, setNewChannelName] = useState("");

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <h3>Create a New Channel</h3>
          <input
            type="text"
            placeholder="Enter channel name..."
            value={newChannelName}
            onChange={(e) => setNewChannelName(e.target.value)}
          />
          <button onClick={() => handleCreateChannel(newChannelName)}>
            Create
          </button>
          <button onClick={() => showModal(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
