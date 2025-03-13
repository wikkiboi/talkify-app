import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface CreateInviteModalProps {
  setModalType: React.Dispatch<React.SetStateAction<boolean>>;
  setShowOptionsModal: React.Dispatch<React.SetStateAction<boolean>>; // Add setShowOptionsModal prop to close the options modal
  setShowModal?: React.Dispatch<React.SetStateAction<boolean>>; // Optional prop to hide the modal
}

export default function CreateInviteModal({
  setModalType,
  setShowOptionsModal,
  setShowModal,
}: CreateInviteModalProps) {
  const [searchTerm, setSearchTerm] = useState(""); // For the search input
  const [friends, setFriends] = useState([]); // Placeholder for friends list
  const navigate = useNavigate();

  // Simulating a friend request with a dummy function
  const handleSendInvite = (friendId: string) => {
    console.log(`Sending invite to friend with ID: ${friendId}`);
    // Here you would call an API to send the invite
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Create an Invite</h3>
        
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search Friends"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        
        {/* Friends List */}
        <div className="friends-list">
          {/* Dummy placeholder for the list of friends */}
          <p>List of friends go here</p>
          {/* Here you can map through the friends and display them, like: */}
          {/* friends.filter(friend => friend.username.includes(searchTerm)).map(friend => (
            <div key={friend._id} className="friend-item">
              {friend.username}
              <button onClick={() => handleSendInvite(friend._id)}>Send Invite</button>
            </div>
          )) */}
        </div>

        {/* Cancel and Submit Buttons */}
        <button onClick={() => console.log("Invite sent!")}>Send Invite</button>
        <button onClick={() => setModalType(false)}>Cancel</button>
      </div>
    </div>
  );
}
