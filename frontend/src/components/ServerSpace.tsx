import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserSpace } from "../types/types";
import { Channel } from "../types/types";
import getUserSpaces from "../api/user/getUserSpaces";
import getSpace from "../api/space/getSpace";
import createChannel from "../api/channel/createChannel";
import getChannelMsgs from "../api/channel/getChannelMsgs";
import logo from "../assets/logo.png";
import CreateSpaceModal from "./CreateSpaceModal";
import JoinSpaceModal from "./JoinSpaceModal";
import socket from "../socket";
import parseTimestamp from "../helper/parseTimestamp";

interface Message {
  id: string;
  username: string;
  text: string;
  timestamp: string;
}

export default function ServerSpace() {
  const { spaceId = "", channelId } = useParams<{ spaceId: string; channelId: string }>();
  const [spaces, setSpaces] = useState<UserSpace[]>([]);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [modalType, setModalType] = useState<"create" | "join" | null>(null);
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");
  const [spaceName, setSpaceName] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const navigate = useNavigate();

  const fetchChannels = async (spaceId: string) => {
    if (!spaceId) return;
  
    try {
      const spaceData = await getSpace(spaceId); // Fetch both space & channels
  
      if (spaceData && spaceData.channels) {
        console.log("Fetched channels:", spaceData.channels); // Debugging log
        setChannels(spaceData.channels); // Set channels from API response
      } else {
        console.error("No channels found for this space.");
      }
    } catch (error) {
      console.error("Error fetching channels:", error);
    }
  };
  
  useEffect(() => {
    const fetchSpaces = async () => {
      const spacesData = await getUserSpaces();
      if (spacesData) {
        setSpaces(spacesData);
      }
    };

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
    fetchSpaceName();
    fetchChannels(spaceId);
  }, [spaceId, channelId]);

  useEffect(() => {
    async function fetchChannelMsgs() {
      if (!spaceId || !channelId) return;
      const response = await getChannelMsgs(spaceId, channelId);

      const channelMsgs = response.map((msg: any) => {
        return {
          id: msg._id,
          username: msg.sender.username,
          text: msg.text,
          timestamp: parseTimestamp(msg._id),
        };
      });

      setMessages(channelMsgs);
    }

    fetchChannelMsgs();

    socket.on(
      "receive-message",
      (id: string, username: string, text: string, timestamp: string) => {
        setMessages((prev) => [...prev, { id, username, text, timestamp }]);
      }
    );

    return () => {
      socket.off("receive-message");
    };
  }, [channelId, spaceId]);

  const sendMessage = () => {
    if (!input.trim()) return;

    socket.emit("send-message", {
      text: input,
      channelId,
      dmUsers: null,
    });

    setInput("");
  };

  const handleSpaceClick = (id: string) => {
    navigate(`/space/${id}`);
  };

  const handleChannelClick = (id: string) => {
    navigate(`/channels/${spaceId}/${id}`);
  };

  const handleCreateChannel = async () => {
    if (!newChannelName.trim() || !spaceId) {
      console.error("Channel name is empty or spaceId is missing.");
      return;
    }
  
    try {
      const newChannel = await createChannel(newChannelName, spaceId);
      if (newChannel) {
        setShowCreateChannelModal(false);
        setNewChannelName(""); // Clear input
        await fetchChannels(spaceId);  // Re-fetch channels after creation
      } else {
        console.error("Failed to create channel.");
      }
    } catch (error) {
      console.error("Error creating channel:", error);
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
                key={space.spaceId}
                className={`space-item ${space.spaceId === spaceId ? "active" : ""}`}
                onClick={() => handleSpaceClick(space.spaceId)}
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
        <h3 className="space-name">{spaceName}</h3>

        {/* Text Channels title with Add Channel button on the right */}
        <div className="channel-header">
          <span className="channel-title">Text Channels</span>
          <button className="add-channel-btn" onClick={() => setShowCreateChannelModal(true)}>
            +
          </button>
        </div>

        {/* List of Channels */}
        <div className="channel-list">
          {channels && channels.length > 0 ? (
            channels.map((channel) => (
              <button
                key={channel._id}
                className={`channel-item ${channel._id === channelId ? "active" : ""}`}
                onClick={() => handleChannelClick(channel._id)}
              >
                # {channel.name}
              </button>
            ))
          ) : (
            <p>No channels available</p>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="chat-box">
        <h1>Chat for Space: {spaceName}</h1>
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
              value={newChannelName ?? ""}
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