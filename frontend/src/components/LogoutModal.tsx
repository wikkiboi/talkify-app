import { useNavigate } from "react-router-dom";

interface LogoutModalProps {
  setShowModal: (modalType: "create" | "join" | "logout" | null) => void;
}

export default function LogoutModal({ setShowModal }: LogoutModalProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Are you sure you want to logout?</h3>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
        <button onClick={() => setShowModal(null)}>Cancel</button>
      </div>
    </div>
  );
}
