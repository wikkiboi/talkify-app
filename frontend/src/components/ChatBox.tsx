import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserSpace } from "../types/types";
import { Channel } from "../types/types";
import { Members } from "../types/types";
import getUserSpaces from "../api/user/getUserSpaces";
import createChannel from "../api/channel/createChannel";
import getSpace from "../api/space/getSpace";
import getChannelMsgs from "../api/channel/getChannelMsgs";
import logo from "../assets/logo.png";
import CreateSpaceModal from "../components/CreateSpaceModal";
import JoinSpaceModal from "../components/JoinSpaceModal";
import LogoutModal from "../components/LogoutModal"; // Import LogoutModal
import socket from "../socket";
import parseTimestamp from "../helper/parseTimestamp";

interface Message {
  id: string;
  username: string;
  text: string;
  timestamp: string;
}

export default function ChatInterface() {
  const { spaceId = "", channelId } = useParams<{ spaceId: string; channelId: string }>();
  const [spaces, setSpaces] = useState<UserSpace[]>([]);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [members, setMembers] = useState<Members[]>([]); // New state for members
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [modalType, setModalType] = useState<"create" | "join" | "logout" | null>(null); // Added "logout" option
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
        setChannels(spaceData.channels); // Set channels from API response
        setMembers(spaceData.space.members); // Set members from API response
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
  
      const spaceData = await getSpace(spaceId);
  
      if (spaceData) {
        setSpaceName(spaceData.space.name);
        setMembers(spaceData.space.members);  // Set members here
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
        <img 
          src={logo} 
          alt="Talkify Logo" 
          onClick={() => navigate('/dashboard')} 
          style={{
            width: "70px", 
            height: "auto", 
            cursor: "pointer", 
            display: "block", 
            margin: "10px auto"
          }} 
        />
        <div className="space-list">
          {spaces.map((space) => (
            <button
              key={space.spaceId}
              className={`space-item ${space.spaceId === spaceId ? "active" : ""}`}
              onClick={() => handleSpaceClick(space.spaceId)}
            >
              {space.name.charAt(0).toUpperCase()}
            </button>
          ))}
        </div>
        <button
          className="create-space-btn"
          onClick={() => setShowOptionsModal(true)}
        >
          ⚙
        </button>
      </div>

      {/* Channel Sidebar */}
      <div className="channel-sidebar">
        <h3 className="space-name">{spaceName}</h3>
        <div className="channel-header">
          <span className="channel-title">Text Channels</span>
          <button className="add-channel-btn" onClick={() => setShowCreateChannelModal(true)}>
            +
          </button>
        </div>
        <div className="channel-list">
          {channels && channels.length > 0 ? (
            channels.map((channel) => (
              <button
                key={channel._id}
                className={`channel-item ${channel._id === channelId ? "active" : ""}`}
                onClick={() => handleChannelClick(channel._id)}
              >
                #{channel.name}
              </button>
            ))
          ) : (
            <p>No channels available</p>
          )}
        </div>

    <div className="members-sidebar">
      <h3 className="members-header">Space Members</h3>
      <div className="members-list">
        {members.length > 0 ? (
          members.map((member) => (
            <button
              key={member._id}
              className="member-item"
            >
              {member.username}
            </button>
          ))
        ) : (
          <p>No members in this space</p>
        )}
      </div>
    </div>
  </div>

      {/* Main Chat Area */}
      <div className="chat-box">
        <h1>Chat for Space: {spaceName}</h1>
        <div className="message-list">
          <p>(Messages will appear here)</p>
        </div>
        <div className="message-input">
          <input type="text" placeholder="Type a message..." value={input} onChange={(e) => setInput(e.target.value)} />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>

      {/* Modals */}
      {showCreateChannelModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Create a New Channel</h3>
            <input
              type="text"
              placeholder="Enter channel name..."
              value={newChannelName ?? ""}
              onChange={(e) => setNewChannelName(e.target.value)}
            />
            <button onClick={handleCreateChannel}>Create</button>
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
            <button onClick={() => setModalType("logout")}>Logout</button>
            <button onClick={() => setShowOptionsModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {modalType === "create" && (
        <CreateSpaceModal
          setShowModal={() => setModalType(null)}
          navigate={navigate}
          setShowOptionsModal={setShowOptionsModal}
        />
      )}

      {modalType === "join" && <JoinSpaceModal setShowModal={() => setModalType(null)} />}
      {modalType === "logout" && <LogoutModal setShowModal={() => setModalType(null)} />}
    </div>
  );
}
