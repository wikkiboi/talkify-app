import { useState } from "react";
import { UserSpace } from "../../types/types";
import NewServerOptionsModal from "../modals/NewServerOptionsModal";
import UserSpaceList from "./UserSpaceList";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

export default function UserSidebar({
  spaces,
  setSpaces,
}: {
  spaces: UserSpace[];
  setSpaces: React.Dispatch<React.SetStateAction<UserSpace[]>>;
}) {
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div className="sidebar">
        <img
          src={logo}
          alt="Talkify Logo"
          className="sidebar-logo"
          onClick={() => navigate("/dashboard")}
        />
        <UserSpaceList spaces={spaces} />
        <button
          className="create-space-btn"
          onClick={() => setShowOptionsModal(true)}
        >
          ⚙
        </button>
      </div>
      {showOptionsModal && (
        <NewServerOptionsModal
          showModal={() => setShowOptionsModal(false)}
          setSpaces={setSpaces}
        />
      )}
    </>
  );
}
