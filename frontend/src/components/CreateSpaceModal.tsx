import { useState } from "react";
import createSpace from "../api/space/createSpace"; // Import createSpace from the space directory
import { useNavigate } from "react-router-dom";

interface CreateSpaceModalProps {
  setShowModal: (show: boolean) => void;
}

export default function CreateSpaceModal({ setShowModal }: CreateSpaceModalProps) {
  const [spaceName, setSpaceName] = useState("");
  const navigate = useNavigate();

  const handleCreateSpace = async () => {
    if (!spaceName) {
      alert("Please enter a space name");
      return;
    }

    try {
      // Assuming the createSpace API returns the newly created space
      const newSpace = await createSpace(spaceName);
      if (newSpace) {
       navigate(`/space/${newSpace._id}`); // Navigate to the newly created space's page
        setShowModal(false); // Close the modal
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
