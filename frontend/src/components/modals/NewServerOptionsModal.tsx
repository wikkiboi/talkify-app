import { useState } from "react";
import CreateSpaceModal from "./CreateSpaceModal";
import JoinSpaceModal from "./JoinSpaceModal";
import LogoutModal from "../LogoutModal";
import { UserSpace } from "../../types/types";

interface OptionsModalProps {
  showModal: (value: React.SetStateAction<boolean>) => void;
  setSpaces: React.Dispatch<React.SetStateAction<UserSpace[]>>;
}

export default function NewServerOptionsModal({
  showModal,
  setSpaces,
}: OptionsModalProps) {
  const [modalType, setModalType] = useState<string | null>(null);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    setModalType(e.currentTarget.value);
  }

  return (
    <>
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-content">
            <h3>Choose an option</h3>
            <button onClick={handleClick} value="create">
              Create a Space
            </button>
            <button onClick={() => setModalType("join")}>
              Join with Invite Code
            </button>
            <button onClick={() => setModalType("logout")}>Logout</button>
            <button onClick={() => showModal(false)}>Cancel</button>
          </div>
        </div>
      </div>

      {modalType === "create" && (
        <CreateSpaceModal
          setModalType={setModalType}
          setShowOptionsModal={() => showModal(false)}
        />
      )}

      {modalType === "join" && (
        <JoinSpaceModal
          setModalType={setModalType}
          setShowOptionsModal={() => showModal(false)}
          setSpaces={setSpaces}
        />
      )}

      {modalType === "logout" && (
        <LogoutModal
          setModalType={setModalType}
          setShowOptionsModal={() => showModal(false)}
        />
      )}
    </>
  );
}
