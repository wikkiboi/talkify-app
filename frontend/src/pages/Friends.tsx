import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getUserSpaces from "../api/user/getUserSpaces";
import getUserFriends from "../api/friend/getUserFriends";
import removeFriend from "../api/friend/removeFriend";
import requestFriend from "../api/friend/requestFriend";
import { UserSpace, UserFriend } from "../types/types";
import logo from "../assets/logo.png";

import LogoutModal from "../components/LogoutModal"; // Import LogoutModal
import acceptFriendRequest from "../api/friend/acceptFriendRequest";
import CreateSpaceModal from "../components/modals/CreateSpaceModal";
import JoinSpaceModal from "../components/modals/JoinSpaceModal";

const FriendsPage = () => {
  const [spaces, setSpaces] = useState<UserSpace[]>([]);
  const [friends, setFriends] = useState<UserFriend[]>([]);
  const [onlineFriends, setOnlineFriends] = useState<UserFriend[]>([]);
  const [pendingRequests, setPendingRequests] = useState<UserFriend[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [notification, setNotification] = useState<string>("");
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [modalType, setModalType] = useState<
    "create" | "join" | "logout" | null
  >(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification("");
      }, 4000);

      return () => clearTimeout(timer); // Cleanup function
    }
  }, [notification]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getUserFriends();
      setFriends(response.friends);
      setPendingRequests(response.pendingRequests);
      setOnlineFriends(
        response.friends.filter((friend: any) => friend.status === "online")
      );
    };

    const fetchSpaces = async () => {
      const spacesData = await getUserSpaces();
      if (spacesData) {
        const transformedSpaces: UserSpace[] = spacesData.map((space) => ({
          name: space.name,
          spaceId: space.spaceId,
          color: space.color,
          lastVisitedChannel: space.lastVisitedChannel,
        }));
        setSpaces(transformedSpaces);
      }
    };

    fetchData();
    fetchSpaces();
  }, []);

  const handleSpaceClick = (spaceId: string) => {
    navigate(`/space/${spaceId}`);
  };

  const handleFriendsClick = () => {
    navigate("/friends");
  };

  const handleAddFriend = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      setNotification("Please enter a username.");
      return;
    }

    try {
      // Send friend request using either username or friendId
      const result = await requestFriend(searchTerm);

      if (result) {
        setNotification("Friend request sent successfully!");
        setSearchTerm(""); // Clear input after sending the request
      } else {
        setNotification("User not found.");
      }
    } catch (error) {
      console.error("Error adding friend:", error);
      setNotification("An error occurred while sending the friend request.");
    }
  };

  const handleAcceptRequest = async (friendId: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found, unable to accept friend request.");
      return;
    }

    const result = await acceptFriendRequest(friendId);
    if (result) {
      setPendingRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== friendId)
      );
      // setFriends((prevFriends) => [...prevFriends, result.userFriends]);
    }
  };

  const handleRemoveFriend = async (friendId: string) => {
    const result = await removeFriend(friendId);
    if (result) {
      setFriends(friends.filter((friend) => friend._id !== friendId));
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
                  onClick={() => handleRemoveFriend(friend._id)}
                  className="remove-friend-btn"
                >
                  X
                </button>
              </div>
            ))
          ) : (
            <p>No friends found.</p>
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
            <p>No online friends.</p>
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
                  onClick={() => handleAcceptRequest(friend._id)}
                  className="accept-request-btn"
                >
                  ✔
                </button>
              </div>
            ))
          ) : (
            <p>No pending requests.</p>
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
