import { useEffect, useState } from "react";
import removeFriend from "../api/friend/removeFriend";
import requestFriend from "../api/friend/requestFriend";
import { UserFriend } from "../types/types";
import acceptFriendRequest from "../api/friend/acceptFriendRequest";
import findUser from "../api/user/findUser";
import getUserFriends from "../api/friend/getUserFriends";

const FriendsPage = () => {
  const [friends, setFriends] = useState<UserFriend[]>([]);
  const [onlineFriends, setOnlineFriends] = useState<UserFriend[]>([]);
  const [pendingRequests, setPendingRequests] = useState<UserFriend[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [notification, setNotification] = useState<string>("");

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification("");
      }, 4000);

      return () => clearTimeout(timer); // Cleanup function
    }
  }, [notification]);

  useEffect(() => {
    const fetchFriendsList = async () => {
      const friendsList = await getUserFriends();
      if (!friendsList) {
        throw new Error("Failed to get friends list");
      }

      setFriends(
        friendsList.userFriends.filter(
          (friend) => friend.friendStatus === "accepted"
        )
      );
      setOnlineFriends(
        friendsList.userFriends.filter(
          (friend) =>
            friend.friendStatus === "accepted" && friend.status === "online"
        )
      );
      setPendingRequests(
        friendsList.userFriends.filter(
          (friend) => friend.friendStatus === "pending"
        )
      );
    };

    fetchFriendsList();
  }, [friends]);

  function updateFriendsList(updatedList: UserFriend[]) {
    setFriends(
      updatedList.filter((friend) => friend.friendStatus === "accepted")
    );
    setOnlineFriends(
      updatedList.filter(
        (friend) =>
          friend.friendStatus === "accepted" && friend.status === "online"
      )
    );
    setPendingRequests(
      updatedList.filter((friend) => friend.friendStatus === "pending")
    );
  }

  const handleAddFriend = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      setNotification("Please enter a username.");
      return;
    }

    try {
      const user = await findUser(searchTerm);
      console.log(searchTerm);
      if (!user) {
        setNotification("User not found");
        return;
      }

      const updatedList = await requestFriend(user._id);

      if (updatedList) {
        updateFriendsList(updatedList.userFriends);
        setNotification("Friend request sent successfully!");
        setSearchTerm("");
      } else {
        setNotification("User already received request or is already a friend");
      }
    } catch (error) {
      console.error("Error adding friend:", error);
      setNotification("An error occurred while sending the friend request.");
    }
  };

  const handleAcceptRequest = async (friendId: string, friendName: string) => {
    const updatedList = await acceptFriendRequest(friendId);
    if (updatedList) {
      updateFriendsList(updatedList.userFriends);
      setNotification(`Now friends with ${friendName}`);
    }
  };

  const handleRemoveFriend = async (friendId: string, friendName: string) => {
    const updatedList = await removeFriend(friendId);
    if (updatedList) {
      updateFriendsList(updatedList.userFriends);
      setNotification(`Removed ${friendName} from friends list`);
    }
  };

  return (
    <div className="friends-page flex">
      {/* Sidebar for All Friends */}
      <div className="all-friends-sidebar">
        <h2 className="friends-title">All Friends</h2>
        <div className="friends-list">
          {friends.length > 0 ? (
            friends.map((friend: UserFriend) => (
              <div key={friend._id} className="friend-item">
                {friend.username}
                <button
                  onClick={() =>
                    handleRemoveFriend(friend.userId, friend.username)
                  }
                  className="remove-friend-btn"
                >
                  X
                </button>
              </div>
            ))
          ) : (
            <p className="no-friend-messages">No friends found.</p>
          )}
        </div>
      </div>

      {/* Sidebar for Online Friends */}
      <div className="friends-sidebar">
        <h2 className="friends-title">Online Friends</h2>
        <div className="friends-list">
          {onlineFriends.length > 0 ? (
            onlineFriends.map((friend: UserFriend) => (
              <div key={friend._id} className="friend-item">
                {friend.username}
              </div>
            ))
          ) : (
            <p className="no-friend-messages">No online friends.</p>
          )}
        </div>
      </div>

      {/* Sidebar for Pending Friend Requests */}
      <div className="pending-requests-sidebar">
        <h2 className="friends-title">Pending Friend Requests</h2>
        <div className="friends-list">
          {pendingRequests.length > 0 ? (
            pendingRequests.map((friend: UserFriend) => (
              <div key={friend._id} className="friend-item">
                <span>{friend.username}</span>
                <button
                  onClick={() =>
                    handleAcceptRequest(friend.userId, friend.username)
                  }
                  className="accept-request-btn"
                >
                  Accept ✔
                </button>
              </div>
            ))
          ) : (
            <p className="no-friend-messages">No pending requests.</p>
          )}
        </div>

        {/* Add Friend Section */}
        <div className="add-friend-section">
          <h3>Add Friend</h3>
          <form onSubmit={handleAddFriend}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter username"
              className="search-input"
            />
            <button type="submit" className="add-friend-btn">
              Add
            </button>
          </form>

          {notification && (
            <div className="notification-popup">{notification}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
