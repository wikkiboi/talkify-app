import { useState } from "react";
import createSpace from "../api/space/createSpace"; // Import createSpace from the space directory
import { NavigateFunction } from "react-router-dom";

interface CreateSpaceModalProps {
  setShowModal: (show: boolean) => void;
  navigate: NavigateFunction; // Add navigate prop
  setShowOptionsModal: React.Dispatch<React.SetStateAction<boolean>>; // Add setShowOptionsModal prop to close the options modal
}

export default function CreateSpaceModal({
  setShowModal,
  navigate,
  setShowOptionsModal,
}: CreateSpaceModalProps) {
  const [spaceName, setSpaceName] = useState("");

  const handleCreateSpace = async () => {
    if (!spaceName) {
      alert("Please enter a space name");
      return;
    }

    try {
      // Assuming the createSpace API returns the newly created space
      const newSpace = await createSpace(spaceName);
      if (newSpace) {
        setShowModal(false); // Close the create/join options modal
        setShowOptionsModal(false); // Close the right-side options tab
        navigate(`/dashboard`); // Navigate to the newly created space's page (or the dashboard)
      }
    } catch (error) {
      console.error("Error creating space:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Create a New Space</h3>
        <input
          type="text"
          placeholder="Space Name"
          value={spaceName}
          onChange={(e) => setSpaceName(e.target.value)}
        />
        <button onClick={handleCreateSpace}>Create Space</button>
        <button onClick={() => setShowModal(false)}>Cancel</button>
      </div>
    </div>
  );
}
