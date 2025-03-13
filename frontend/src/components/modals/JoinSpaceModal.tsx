import { useState } from "react";
import joinSpace from "../../api/user/joinSpace";
import { UserSpace } from "../../types/types";
import { useNavigate } from "react-router-dom";

interface JoinSpaceModalProps {
  setModalType: React.Dispatch<React.SetStateAction<string | null>>;
  setShowOptionsModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSpaces: React.Dispatch<React.SetStateAction<UserSpace[]>>;
}

export default function JoinSpaceModal({
  setModalType,
  setShowOptionsModal,
  setSpaces,
}: JoinSpaceModalProps) {
  const [inviteCode, setInviteCode] = useState("");
  const navigate = useNavigate();

  const handleJoin = async () => {
    const updatedSpaceList = await joinSpace(inviteCode);
    if (!updatedSpaceList) {
      throw new Error("Not a valid invite code");
    }
    setSpaces(updatedSpaceList.userSpaces);

    navigate(
      `/channels/${updatedSpaceList.space._id}/${updatedSpaceList.space.defaultChannel}`
    );
    setModalType(null);
    setShowOptionsModal(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Join a Space</h2>
        <input
          type="text"
          placeholder="Enter Invite Code"
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
          className="input-field"
        />
        <div className="modal-buttons">
          <button onClick={handleJoin} className="btn-primary">
            Join
          </button>
          <button onClick={() => setModalType(null)} className="btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
