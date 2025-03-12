import { useState } from "react";
import CreateSpaceModal from "./CreateSpaceModal";
import JoinSpaceModal from "./JoinSpaceModal";

interface OptionsModalProps {
  showModal: (value: React.SetStateAction<boolean>) => void;
}

export default function NewServerOptionsModal({
  showModal,
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
              Create a Server
            </button>
            <button onClick={() => setModalType("join")}>Join with ID</button>
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
        />
      )}
    </>
  );
}
