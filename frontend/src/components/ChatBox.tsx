import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserSpace } from "../types/types";
import { Channel } from "../types/types";
import getUserSpaces from "../api/user/getUserSpaces";
import getSpace from "../api/space/getSpace";
import createChannel from "../api/channel/createChannel";
import getChannelMsgs from "../api/channel/getChannelMsgs";
import deleteChannel from "../api/channel/deleteChannel";
import logo from "../assets/logo.png";
import CreateSpaceModal from "./CreateSpaceModal";
import JoinSpaceModal from "./JoinSpaceModal";
import socket from "../socket";
import parseTimestamp from "../helper/parseTimestamp";
import { Message } from "../types/types";

export default function ChatInterface() {
  const { spaceId = "", channelId } = useParams<{
    spaceId: string;
    channelId: string;
  }>();
  const [spaces, setSpaces] = useState<UserSpace[]>([]);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);
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

      console.log("Fetching space with ID:", spaceId); // Log the spaceId being used
      const spaceData = await getSpace(spaceId);

      console.log("Fetched space data:", spaceData); // Log the response data

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

      const channelMsgs = response.map((msg: Message) => {
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

    socket.on("receive-message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, [channelId, spaceId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null; // Ensure it's an HTMLElement
      if (
        showDropdown &&
        target &&
        !target.closest(".dropdown-menu") && // Check if the click is outside the dropdown
        !target.closest(".ellipsis-btn") // Also exclude the ellipsis button
      ) {
        setShowDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showDropdown]);

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
        await fetchChannels(spaceId); // Re-fetch channels after creation
      } else {
        console.error("Failed to create channel.");
      }
    } catch (error) {
      console.error("Error creating channel:", error);
    }
  };

  const toggleDropdown = (event: React.MouseEvent, channelId: string) => {
    event.stopPropagation();

    // Get the position of the clicked element
    const rect = (event.target as HTMLElement).getBoundingClientRect();

    // Calculate the dropdown position
    setDropdownPosition({
      top: rect.bottom + 5, // Position below the ellipsis button
      left: rect.left + rect.width + 5, // Position to the right of the button
    });

    // Toggle dropdown visibility based on the channelId
    setShowDropdown((prev) => (prev === channelId ? null : channelId));
  };

  const handleEditChannel = (channelId: string) => {
    console.log("Editing channel:", channelId);
    setShowDropdown(null);
    // Implement your edit logic here (e.g., open a modal)
  };

  const handleDeleteChannel = async (channelId: string) => {
    console.log("Deleting channel:", channelId);
    setShowDropdown(null);

    try {
      await deleteChannel(spaceId, channelId); // Implement this API call
      await fetchChannels(spaceId); // Refresh channel list after deletion
    } catch (error) {
      console.error("Error deleting channel:", error);
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
                className={`space-item ${
                  space.spaceId === spaceId ? "active" : ""
                }`}
                onClick={() => handleSpaceClick(space.spaceId)}
              >
                {space.name.charAt(0).toUpperCase()}{" "}
                {/* Display the first letter of the space name */}
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
          <button
            className="add-channel-btn"
            onClick={() => setShowCreateChannelModal(true)}
          >
            +
          </button>
        </div>

        {/* List of Channels */}
        <div className="channel-list">
          {channels && channels.length > 0 ? (
            channels.map((channel) => (
              <div key={channel._id} className="channel-item-container">
                {/* Channel Name */}
                <div
                  className={`channel-name ${
                    channel._id === channelId ? "active" : ""
                  }`}
                  onClick={() => handleChannelClick(channel._id)}
                >
                  <div className="channel-name"># {channel.name}</div>

                  {/* Ellipsis Button */}
                  <div className="ellipsis-container">
                    <button
                      className="ellipsis-btn"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevents channel click
                        toggleDropdown(e, channel._id);
                      }}
                    >
                      ⋮
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No channels available</p>
          )}
        </div>

        {/* Dropdown Menu - Positioned Outside Sidebar */}
        {showDropdown && (
          <div
            ref={dropdownRef}
            className="dropdown-menu"
            style={{
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              position: "absolute", // Ensures the dropdown is positioned relative to the container
            }}
          >
            <div className="arrow-up"></div> {/* Little arrow */}
            <button onClick={() => handleEditChannel(showDropdown)}>
              Edit
            </button>
            <button onClick={() => handleDeleteChannel(showDropdown)}>
              Delete
            </button>
            <button onClick={() => setShowDropdown(null)}>Cancel</button>
          </div>
        )}
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
            <button onClick={handleCreateChannel}>Create</button>{" "}
            {/* Button to create */}
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
            <button onClick={() => setModalType("create")}>
              Create a Server
            </button>
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
      {modalType === "join" && (
        <JoinSpaceModal setShowModal={() => setModalType(null)} />
      )}
    </div>
  );
}
