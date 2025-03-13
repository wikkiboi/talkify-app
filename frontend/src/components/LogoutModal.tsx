import { useNavigate } from "react-router-dom";

interface LogoutModalProps {
  setModalType: React.Dispatch<React.SetStateAction<string | null>>;
  setShowOptionsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LogoutModal({
  setModalType,
  setShowOptionsModal,
}: LogoutModalProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setModalType(null);
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <h3>Are you sure you want to logout?</h3>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
          <button onClick={() => setShowOptionsModal(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
