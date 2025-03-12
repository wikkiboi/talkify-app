import { useState } from "react";
import createSpace from "../api/space/createSpace"; // Import createSpace from the space directory
import { useNavigate } from "react-router-dom";

interface CreateSpaceModalProps {
  setModalType: React.Dispatch<React.SetStateAction<string | null>>;
  setShowOptionsModal: React.Dispatch<React.SetStateAction<boolean>>; // Add setShowOptionsModal prop to close the options modal
}

export default function CreateSpaceModal({
  setModalType,
  setShowOptionsModal,
}: CreateSpaceModalProps) {
  const [spaceName, setSpaceName] = useState("");
  const navigate = useNavigate();
  const handleCreateSpace = async () => {
    if (!spaceName) {
      alert("Please enter a space name");
      return;
    }

    console.log(spaceName);

    try {
      const newSpace = await createSpace(spaceName);
      if (newSpace) {
        setModalType(null);
        setShowOptionsModal(false);
        navigate(
          `/channels/${newSpace.space._id}/${newSpace.space.defaultChannel}`
        );
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
        <button onClick={() => setModalType(null)}>Cancel</button>
      </div>
    </div>
  );
}
