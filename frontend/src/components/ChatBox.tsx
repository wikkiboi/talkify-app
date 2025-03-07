import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import getUserSpaces from "../api/user/getUserSpaces";
import { Space } from "../types/types";
import logo from "../assets/logo.png";
import CreateSpaceModal from "../components/CreateSpaceModal";
import JoinSpaceModal from "../components/JoinSpaceModal";
// import getChannelMsgs from "../api/channel/getChannelMsgs";
import createChannel from "../api/channel/createChannel";
import getSpace from "../api/space/getSpace";
// import createSpace from "../api/space/createSpace";

export default function ChatInterface() {
  const { spaceId } = useParams<{ spaceId: string }>();
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [modalType, setModalType] = useState<"create" | "join" | null>(null);
  const [channels, setChannels] = useState<string[]>([]);
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");
  const [spaceName, setSpaceName] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpaces = async () => {
      const spacesData = await getUserSpaces();
      if (spacesData) {
        setSpaces(spacesData);
      }
    };
  
    // const fetchChannels = async () => {
    //   if (!spaceId) return;
    //   const response = await getChannelMsgs(spaceId, "general"); // Fetch general by default
    //   if (response) {
    //     setChannels(response.channels || []); // Assuming response contains a `channels` array
    //   }
    // };
  
    const fetchSpaceName = async () => {
      if (!spaceId) return;
  
      console.log("Fetching space with ID:", spaceId);  // Log the spaceId being used
      const spaceData = await getSpace(spaceId);
  
      console.log("Fetched space data:", spaceData);  // Log the response data
  
      if (spaceData) {
        setSpaceName(spaceData.space.name);
      } else {
        console.log("Space not found.");
      }
    };
  
    fetchSpaces();
    // fetchChannels();
    fetchSpaceName();
  }, [spaceId]);

  const handleSpaceClick = (id: string) => {
    navigate(`/space/${id}`);
  };

  const handleCreateChannel = async () => {
    if (!newChannelName.trim() || !spaceId) {
      console.error("Channel name is empty or spaceId is missing.");
      return;
    }
  
    console.log("Creating channel:", newChannelName); // Log the channel name to console
    const newChannel = await createChannel(newChannelName, spaceId);
  
    if (newChannel) {
      console.log("New Channel Created:", newChannel);
      // Optimistically update the channel list
      setChannels((prevChannels) => [...prevChannels, newChannel.name]);
      setShowCreateChannelModal(false); // Close the modal
      setNewChannelName(""); // Clear input
    } else {
      console.error("Failed to create channel.");
    }
  };

  return (
    <div className="chat-container">
      {/* Sidebar for Spaces */}
      <div className="spaces-sidebar">
        <img src={logo} alt="Talkify Logo" className="sidebar-logo" />
        <div className="sidebar">

        {/* Logo at the top */}
        <img src={logo} alt="Talkify Logo" className="sidebar-logo" />

        {/* Spaces list */}
        <div className="space-list">
          {spaces.map((space) => (
            <button
              key={space._id}
              className={`space-item ${space._id === spaceId ? "active" : ""}`}
              onClick={() => handleSpaceClick(space._id)}
            >
              {space.name.charAt(0).toUpperCase()} {/* Display the first letter of the space name */}
            </button>
          ))}
        </div>

        {/* Plus button at the bottom */}
        <button
          className="create-space-btn"
          onClick={() => setShowOptionsModal(true)} // Open modal to choose
        >
          +
        </button>
      </div>
      </div>

      {/* Channels Sidebar */}
      <div className="channel-sidebar">
        <h3>Text Channels</h3>
        <ul>
          {channels.map((channel, index) => (
          <li key={index}>#{channel}</li> // List the channels dynamically
        ))}
        </ul>
        <button
          className="create-channel-btn"
          onClick={() => setShowCreateChannelModal(true)}
        >
          + Add Channel
        </button>
      </div>

      {/* Main Chat Area */}
      <div className="chat-box">
        <h1>Chat for Space: {spaceId}</h1>
        <div className="message-list">
          <p>(Messages will appear here)</p>
        </div>
        <div className="message-input">
          <input type="text" placeholder="Type a message..." />
          <button>Send</button>
        </div>
      </div>

      {/* Create Channel Modal */}
      {showCreateChannelModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Create a New Channel</h3>
            <input
              type="text"
              placeholder="Enter channel name..."
              value={newChannelName}
              onChange={(e) => setNewChannelName(e.target.value)} // Track input value
            />
            <button onClick={handleCreateChannel}>Create</button> {/* Button to create */}
            <button onClick={() => setShowCreateChannelModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {showOptionsModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Choose an option</h3>
            <button onClick={() => setModalType("create")}>Create a Server</button>
            <button onClick={() => setModalType("join")}>Join with ID</button>
            <button onClick={() => setShowOptionsModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Show Create Server Modal */}
      {modalType === "create" && (
        <CreateSpaceModal
          setShowModal={() => setModalType(null)} // Close Create Space Modal (by setting modalType to null)
          navigate={navigate}
          setShowOptionsModal={setShowOptionsModal} // Pass setShowOptionsModal to close the options modal
        />
      )}

      {/* Show Join Server Modal */}
      {modalType === "join" && <JoinSpaceModal setShowModal={() => setModalType(null)} />}
    </div>
  );
}