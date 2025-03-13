import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserFriend } from "../types/types";
import getUserFriends from "../api/friend/getUserFriends";
import DirectMessageSidebar from "../components/DM/DMSidebar";
import ChatArea from "../components/chat/ChatArea";

export default function Dashboard() {
  const { friendId } = useParams();
  const [friends, setFriends] = useState<UserFriend[]>([]);
  const [currentFriend, setCurrentFriend] = useState<string>("");

  useEffect(() => {
    const fetchFriends = async () => {
      const { userFriends } = await getUserFriends();
      setFriends(userFriends);

      console.log(userFriends);

      const selectedFriend = userFriends.find(
        (friend) => friend.userId === friendId
      );
      if (selectedFriend) {
        setCurrentFriend(selectedFriend.username);
      }
    };

    fetchFriends();
  }, [friendId]);

  console.log(currentFriend);

  return (
    <div className="chat-container">
      <DirectMessageSidebar />
      <ChatArea currentChat={currentFriend} />
    </div>
  );
}
