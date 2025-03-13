import { useEffect, useState } from "react";
import { UserFriend } from "../../types/types";
import getUserFriends from "../../api/friend/getUserFriends";
import { useNavigate, useParams } from "react-router-dom";

export default function DirectMessageSidebar() {
  const [friends, setFriends] = useState<UserFriend[]>([]);
  const { friendId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchFriends() {
      const { userFriends } = await getUserFriends();
      setFriends(userFriends);
    }
    fetchFriends();
  }, []);

  const handleSelectFriend = (friendId: string) => {
    navigate(`/direct/${friendId}`);
  };

  const handleFriendsClick = () => {
    navigate("/friends");
  };

  return (
    <div className="DM-sidebar">
      <h3 className="DM-sidebar-title">Direct Messages</h3>
      <ul className="DM-friend-list">
        {friends.length > 0 ? (
          friends.map((friend) => (
            <li 
              key={friend._id} 
              className={`DM-friend-item ${friend._id === friendId ? "active" : ""}`}
              onClick={() => handleSelectFriend(friend._id)}
            >
              {friend.username}
            </li>
          ))
        ) : (
          <p className="no-friends">No friends available</p>
        )}
      </ul>

      <div className="friends-btn-container">
        <button className="friends-btn" onClick={handleFriendsClick}>
          Friends
        </button>
      </div>
    </div>
  );
}
