import { useEffect, useState } from "react";
import getUserSpaces from "../api/user/getUserSpaces";
import getUserInfo from "../api/user/getUserInfo";
import { UserSpace } from "../types/types";
import { useNavigate } from "react-router-dom";
import UserStatus from "../components/UserStatus";
import CreateSpaceModal from "../components/CreateSpaceModal";
import JoinSpaceModal from "../components/JoinSpaceModal";
import LogoutModal from "../components/LogoutModal"; // Import LogoutModal
import logo from "../assets/logo.png";

export default function Dashboard() {
  const [spaces, setSpaces] = useState<UserSpace[]>([]);
  const [username, setUsername] = useState<string>("");
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [modalType, setModalType] = useState<
    "create" | "join" | "logout" | null
  >(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserInfo();
      if (userData) {
        setUsername(userData.username);
      }
    };

    const fetchSpaces = async () => {
      const spacesData = await getUserSpaces();
      if (spacesData) {
        const transformedSpaces: UserSpace[] = spacesData.map((space) => ({
          name: space.name,
          spaceId: space.spaceId,
          color: space.color,
          lastVisitedChannel: space.lastVisitedChannel,
        }));
        setSpaces(transformedSpaces);
      }
    };

    fetchUser();
    fetchSpaces();
  }, []);

  const handleSpaceClick = (spaceId: string) => {
    navigate(`/space/${spaceId}`);
  };

  const handleFriendsClick = () => {
    navigate("/friends");
  };

  return (
    <div className="dashboard-container">
      <div className="content">Dashboard</div>
      {/* Sidebar for Spaces */}
      <div className="sidebar">
        <img
          src={logo}
          alt="Talkify Logo"
          className="sidebar-logo cursor-pointer"
          onClick={() => navigate("/dashboard")}
        />

        {/* Spaces list */}
        <div className="space-list">
          {spaces.map((space) => (
            <button
              key={space.spaceId}
              className="space-item"
              onClick={() => handleSpaceClick(space.spaceId)}
            >
              {space.name.charAt(0).toUpperCase()}
            </button>
          ))}
        </div>

        {/* Settings Button */}
        <button
          className="create-space-btn"
          onClick={() => setShowOptionsModal(true)}
        >
          ⚙
        </button>
      </div>

      {/* Sidebar for Direct Messages */}
      <div className="direct-messages-sidebar">
        <h3 className="direct-messages-title">Direct Messages</h3>
        <button className="friends-btn" onClick={handleFriendsClick}>
          Friends
        </button>
      </div>

      {/* Options Modal for Create, Join, or Logout */}
      {showOptionsModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Choose an option</h3>
            <button onClick={() => setModalType("create")}>
              Create a Server
            </button>
            <button onClick={() => setModalType("join")}>Join with ID</button>
            <button onClick={() => setModalType("logout")}>Logout</button>
            <button onClick={() => setShowOptionsModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Show Create Server Modal */}
      {modalType === "create" && (
        <CreateSpaceModal
          setShowModal={() => setModalType(null)}
          navigate={navigate}
          setShowOptionsModal={setShowOptionsModal}
        />
      )}

      {/* Show Join Server Modal */}
      {modalType === "join" && (
        <JoinSpaceModal setShowModal={() => setModalType(null)} />
      )}

      {/* Show Logout Modal */}
      {modalType === "logout" && (
        <LogoutModal setShowModal={() => setModalType(null)} />
      )}
    </div>
  );
}
