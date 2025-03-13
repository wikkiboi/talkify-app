import { useEffect, useState } from "react";
import { GroupDm, PrivateDM, UserFriend } from "../../types/types";
import getUserFriends from "../../api/friend/getUserFriends";
import { useNavigate, useParams } from "react-router-dom";
import getAllUserDms from "../../api/user/getAllUserDms";
import { useUserContext } from "../../helper/UserContext";

interface DmList {
  privateDms: PrivateDM[];
  groupDms: GroupDm[];
}

export default function DirectMessageSidebar() {
  const [dmList, setDmList] = useState<DmList>({
    privateDms: [],
    groupDms: [],
  });
  const [friends, setFriends] = useState<UserFriend[]>([]);
  const { friendId } = useParams();
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useUserContext();

  useEffect(() => {
    async function fetchDms() {
      const response = await getAllUserDms();
      if (!response) {
        throw new Error("Failed to fetch user's dms");
      }

      setDmList({
        privateDms: response.privateDms,
        groupDms: response.groupDms,
      });
    }
    fetchDms();
  }, []);

  const privateDm = dmList.privateDms.map((dm) => {
    const otherParticipant = dm.participants.find(
      (p) => p.username !== userInfo.username
    );

    if (!otherParticipant) return null;

    return (
      <li
        key={dm._id}
        className={`DM-friend-item ${
          otherParticipant?._id === friendId ? "active" : ""
        }`}
        onClick={() => handleSelectFriend(otherParticipant._id, dm._id)}
      >
        {otherParticipant.username}
      </li>
    );
  });

  const handleSelectFriend = (friendId: string, dmId: string) => {
    navigate(`/direct/${friendId}/${dmId}`);
  };

  return (
    <div className="DM-sidebar">
      <h3 className="DM-sidebar-title">Direct Messages</h3>
      <ul className="DM-friend-list">
        {dmList.groupDms.length > 0 || dmList.privateDms.length > 0 ? (
          privateDm
        ) : (
          <p className="no-friends">No DMs available</p>
        )}
      </ul>

      <div className="friends-btn-container">
        <button className="friends-btn" onClick={() => navigate("/friends")}>
          Friends
        </button>
      </div>
    </div>
  );
}
