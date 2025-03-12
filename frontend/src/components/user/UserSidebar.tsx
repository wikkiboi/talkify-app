import { useState } from "react";
import { UserSpace } from "../../types/types";
import NewServerOptionsModal from "../modals/NewServerOptionsModal";
import UserSpaceList from "./UserSpaceList";
import logo from "../../assets/logo.png";

export default function UserSidebar({ spaces }: { spaces: UserSpace[] }) {
  const [showOptionsModal, setShowOptionsModal] = useState(false);

  return (
    <>
      <div className="sidebar">
        <img src={logo} alt="Talkify Logo" className="sidebar-logo" />
        <UserSpaceList spaces={spaces} />
        <button
          className="create-space-btn"
          onClick={() => setShowOptionsModal(true)}
        >
          +
        </button>
      </div>
      {showOptionsModal && (
        <NewServerOptionsModal showModal={() => setShowOptionsModal(false)} />
      )}
    </>
  );
}
