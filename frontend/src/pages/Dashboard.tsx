import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleFriendsClick = () => {
    navigate("/friends");
  };

  return (
    <div className="dashboard-container">
      <div className="direct-messages-sidebar">
        <h3 className="direct-messages-title">Direct Messages</h3>
        {/* List out list of private dms/group dms here */}
        <button className="friends-btn" onClick={handleFriendsClick}>
          Friends
        </button>
      </div>
    </div>
  );
}