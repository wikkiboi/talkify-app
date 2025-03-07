import { useEffect, useState } from "react";
import getUserSpaces from "../api/user/getUserSpaces";
import { Spaces, UserSpaces } from "../types/types"; // Correctly import Spaces and UserSpaces types
import { useNavigate } from "react-router-dom";
import UserStatus from "../components/UserStatus";
import CreateSpaceModal from "../components/CreateSpaceModal";
import JoinSpaceModal from "../components/JoinSpaceModal"; // Import Join Modal
import logo from "../assets/logo.png"; // Import logo

export default function Dashboard() {
  // Initialize spaces as an empty array of type UserSpaces (an array of Spaces objects)
  const [spaces, setSpaces] = useState<UserSpaces>([]); // Use the UserSpaces type for the state

  const [showOptionsModal, setShowOptionsModal] = useState(false); // For choosing create/join
  const [modalType, setModalType] = useState<"create" | "join" | null>(null); // Type of modal
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpaces = async () => {
      const spacesData = await getUserSpaces();
      if (spacesData) {
        // Transform the Space[] data to UserSpaces format
        const transformedSpaces: UserSpaces = spacesData.map((space) => ({
          name: space.name,
          spaceId: space.spaceId,
        }));
        setSpaces(transformedSpaces);
      }
    };

    fetchSpaces();
  }, []);

  const handleSpaceClick = (spaceId: string) => {
    navigate(`/space/${spaceId}`);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        {/* Logo at the top */}
        <img src={logo} alt="Talkify Logo" className="sidebar-logo" />

        {/* Spaces list */}
        <div className="space-list">
          {spaces.map((space) => (
            <button
              key={space.spaceId} // Correctly access spaceId from the Spaces type
              className="space-item"
              onClick={() => handleSpaceClick(space.spaceId)} // Handle space click using spaceId
            >
              {space.name.charAt(0).toUpperCase()} {/* Display the first letter of the space name */}
            </button>
          ))}
        </div>

        {/* Plus button at the bottom */}
        <button
          className="create-space-btn"
          onClick={() => setShowOptionsModal(true)} // Open modal to choose
        >
          +
        </button>
      </div>

      {/* Content Area */}
      <div className="content">
        <UserStatus />
      </div>

      {/* Modal for choosing Create or Join */}
      {showOptionsModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Choose an option</h3>
            <button onClick={() => setModalType("create")}>Create a Server</button>
            <button onClick={() => setModalType("join")}>Join with ID</button>
            <button onClick={() => setShowOptionsModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Show Create Server Modal */}
      {modalType === "create" && (
        <CreateSpaceModal
          setShowModal={() => setModalType(null)} // Close Create Space Modal (by setting modalType to null)
          navigate={navigate}
          setShowOptionsModal={setShowOptionsModal} // Pass setShowOptionsModal to close the options modal
        />
      )}

      {/* Show Join Server Modal */}
      {modalType === "join" && <JoinSpaceModal setShowModal={() => setModalType(null)} />}
    </div>
  );
}
