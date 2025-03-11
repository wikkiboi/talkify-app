// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { UserSpace, Channel } from "../types/types";
// import getUserSpaces from "../api/user/getUserSpaces";
// import getSpace from "../api/space/getSpace";
// import deleteSpace from "../api/space/deleteSpace";
// import updateSpace from "../api/space/updateSpace";
// import createChannel from "../api/channel/createChannel";
// import deleteChannel from "../api/channel/deleteChannel";
// import updateChannel from "../api/channel/updateChannel";
// import getChannelMsgs from "../api/channel/getChannelMsgs";
// import MessageInput from "../api/channel/sendMessage";
// import logo from "../assets/logo.png";
// import CreateSpaceModal from "./CreateSpaceModal";
// import JoinSpaceModal from "./JoinSpaceModal";
// import socket from "../socket";
// import parseTimestamp from "../helper/parseTimestamp";

// interface Message {
//   id: string;
//   username: string;
//   text: string;
//   timestamp: string;
// }

// interface MessageInputProps {
//   sendMessage: (message: string) => void;
// }

// export default function ChatInterface() {
//     const { spaceId = "", channelId } = useParams<{ spaceId: string; channelId: string }>();
//     const [spaces, setSpaces] = useState<UserSpace[]>([]);
//     const [spaceContextMenu, setSpaceContextMenu] = useState(false);
//     const [spaceContextMenuPosition, setSpaceContextMenuPosition] = useState<{ x: number; y: number } | null>(null);
//     const [currentSpaceId, setCurrentSpaceId] = useState<string | null>(null);
//     const [channels, setChannels] = useState<Channel[]>([]);
//     const [messages, setMessages] = useState<Message[]>([]);
//     const [showOptionsModal, setShowOptionsModal] = useState(false);
//     const [modalType, setModalType] = useState<"create" | "join" | null>(null);
//     const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
//     const [newChannelName, setNewChannelName] = useState("");
//     const [channelName, setChannelName] = useState("Loading...");
//     const [showContextMenu, setShowContextMenu] = useState(false);
//     const [contextMenuPosition, setContextMenuPosition] = useState<{ x: number; y: number } | null>(null);
//     const [currentChannelId, setCurrentChannelId] = useState<string | null>(null);
//     const [spaceName, setSpaceName] = useState<string>("");
//     const [input, setInput] = useState<string>("");
//     const navigate = useNavigate();

//     const fetchChannels = async (spaceId: string) => {
//         if (!spaceId) return;
  
//         try {
//             const spaceData = await getSpace(spaceId); // Fetch both space & channels
  
//             if (spaceData && spaceData.channels) {
//                 console.log("Fetched channels:", spaceData.channels); // Debugging log
//                 setChannels(spaceData.channels); // Set channels from API response
//             } else {
//                 console.error("No channels found for this space.");
//             }
//         } catch (error) {
//             console.error("Error fetching channels:", error);
//         }
//     };
  
//     useEffect(() => {
//         const fetchSpaces = async () => {
//             const spacesData = await getUserSpaces();
//             if (spacesData) {
//                 setSpaces(spacesData);
//             }
//         };

//         const fetchSpaceName = async () => {
//             if (!spaceId) return;
  
//             console.log("Fetching space with ID:", spaceId);  // Log the spaceId being used
//             const spaceData = await getSpace(spaceId);
  
//             console.log("Fetched space data:", spaceData);  // Log the response data
  
//             if (spaceData) {
//                 setSpaceName(spaceData.space.name);
//             } else {
//                 console.log("Space not found.");
//             }
//         };
    
//         fetchSpaces();
//         fetchSpaceName();
//         fetchChannels(spaceId);
//     }, [spaceId, channelId]);

//     useEffect(() => {
//         async function fetchChannelMsgs() {
//             if (!spaceId || !channelId) {
//                 setMessages([]); // Clear messages when switching channels
//                 return;
//             }   
  
//             try {
//                 console.log(`Fetching messages for Space: ${spaceId}, Channel: ${channelId}`);
//                 const response = await getChannelMsgs(spaceId, channelId);
            
//                 if (response && Array.isArray(response)) {
//                     const formattedMsgs = response.map((msg: any) => ({
//                         id: msg._id,
//                         username: msg.sender.username,
//                         text: msg.text,
//                         timestamp: parseTimestamp(msg._id),
//                     }));
                
//                     setMessages(formattedMsgs);
//                 } else {
//                     console.error("Invalid response format:", response);
//                 }
//             } catch (error) {
//                 console.error("Error fetching messages:", error);
//             }
//         }
  
//         fetchChannelMsgs();
  
//         // Handle real-time message reception
//         const handleReceiveMessage = (id: string, username: string, text: string, timestamp: string) => {
//             setMessages((prev) => [...prev, { id, username, text, timestamp }]);
//         };
  
//         socket.on("receive-message", handleReceiveMessage);
  
//         return () => {
//             socket.off("receive-message", handleReceiveMessage); // Cleanup to prevent duplicates
//         };
//     }, [channelId, spaceId]); // Depend on `channelId` so it refreshes on channel switch
  
//     const handleGlobalClick = () => {
//         handleContextMenuClose();
//         setSpaceContextMenu(false);
//         setSpaceContextMenuPosition(null);
//     };

//     const handleSpaceContextMenu = (event: React.MouseEvent, spaceId: string) => {
//         event.preventDefault();
//         setCurrentSpaceId(spaceId);
//         setSpaceContextMenuPosition({ x: event.clientX, y: event.clientY });
//         setSpaceContextMenu(true);
//     };

//     const handleEditSpace = async () => {
//         if (currentSpaceId) {
//             const newName = prompt("Enter new space name:");
//             const newColor = prompt("Enter new color for the space (e.g., #ff0000):");
//             if (newName && newColor) {
//                 const result = await updateSpace(currentSpaceId, newName, newColor);
//                 if (result) {
//                     setSpaces((prevSpaces) =>
//                         prevSpaces.map((space) =>
//                             space.spaceId === currentSpaceId ? { ...space, name: newName, color: newColor } : space
//                         )
//                     );
//                     console.log("Space updated successfully");
//                 }
//             }
//         }
//         setSpaceContextMenu(false);
//         setSpaceContextMenuPosition(null);
//     };

//     const sendMessage = async (message: string) => {
//         if (!message.trim() || !channelId) return;
  
//         const messageData = {
//             text: message,
//             channelId,
//             dmUsers: null,
//         };
  
//         try {
//             const response = await fetch(`/api/messages`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(messageData),
//             });
  
//             if (!response.ok) throw new Error("Failed to send message");
  
//             const savedMessage = await response.json();
  
//             socket.emit("send-message", savedMessage);
  
//             setMessages((prev) => [
//                 ...prev,
//             {
//                 id: savedMessage._id,
//                 username: savedMessage.sender.username,
//                 text: savedMessage.text,
//                 timestamp: parseTimestamp(savedMessage._id),
//             },
//         ]);
//         } catch (error) {
//             console.error("Error sending message:", error);
//         }
//     };

//     const handleMenuButtonClick = (event: React.MouseEvent, channelId: string) => {
//         event.stopPropagation();
//         console.log("Menu button clicked for channel:", channelId);
//         setCurrentChannelId(channelId);
//         setContextMenuPosition({ x: event.clientX, y: event.clientY });
//         setShowContextMenu(true);
//       };

//     const handleDeleteChannel = async () => {
//         if (currentChannelId && spaceId) {
//             const result = await deleteChannel(spaceId, currentChannelId);
//             if (result) {
//                 setChannels((prevChannels) =>
//                     prevChannels.filter((channel) => channel._id !== currentChannelId)
//                 );
//                 console.log("Channel deleted successfully");
//             }
//         }
//         setShowContextMenu(false);
//         setContextMenuPosition(null);
//     };

//     const handleEditChannel = async () => {
//         if (currentChannelId && spaceId) {
//             const newName = prompt("Enter new channel name:");
//             if (newName) {
//                 const result = await updateChannel(spaceId, currentChannelId, newName);
//                 if (result) {
//                     setChannels((prevChannels) =>
//                         prevChannels.map((channel) =>
//                             channel._id === currentChannelId ? { ...channel, name: newName } : channel
//                         )
//                     );
//                     console.log("Channel updated successfully");
//                 }
//             }
//         }
//         setShowContextMenu(false);
//         setContextMenuPosition(null);
//     };

//     const handleContextMenuClose = () => {
//         setShowContextMenu(false);
//         setContextMenuPosition(null);
//     };

//     const MessageInput: React.FC<MessageInputProps> = ({ sendMessage }) => {
  
//         const handleSend = () => {
//             if (!input.trim()) return;
            
//             sendMessage(input);
//             setInput(""); // Clear after sending
//         };

//         const handleSpaceClick = (id: string) => {
//             navigate(`/space/${id}`);
//         };

//         const handleChannelClick = (id: string) => {
//             navigate(`/channels/${spaceId}/${id}`);
//         };

//         const handleCreateChannel = async () => {
//             if (!newChannelName.trim() || !spaceId) {
//                 console.error("Channel name is empty or spaceId is missing.");
//                 return;
//             }
  
//             try {
//                 const newChannel = await createChannel(newChannelName, spaceId);
//                 if (newChannel) {
//                     setShowCreateChannelModal(false);
//                     setNewChannelName(""); // Clear input
//                     await fetchChannels(spaceId);  // Re-fetch channels after creation
//                 } else {
//                     console.error("Failed to create channel.");
//                 }
//             } catch (error) {
//                 console.error("Error creating channel:", error);
//             }
//         };
  
//         return (
//             <div className="chat-container" onClick={handleGlobalClick}>
//                 {/* Sidebar for Spaces */}
//                 <div className="spaces-sidebar">
//                     <img src={logo} alt="Talkify Logo" className="sidebar-logo" />
//                     <div className="sidebar">
//                         <img src={logo} alt="Talkify Logo" className="sidebar-logo" />
            
//                         {/* Spaces list */}
//                         <div className="space-list">
//                             {spaces.map((space) => (
//                                 <button
//                                     key={space.spaceId}
//                                     className={`space-item ${space.spaceId === spaceId ? "active" : ""}`}
//                                     onClick={() => handleSpaceClick(space.spaceId)}
//                                     onContextMenu={(e) => handleSpaceContextMenu(e, space.spaceId)}
//                                 >
//                                     {space.name.charAt(0).toUpperCase()} {/* Display the first letter of the space name */}
//                                 </button>
//                             ))}
//                         </div>
                          
//                         {/* Plus button at the bottom */}
//                         <button
//                             className="create-space-btn"
//                             onClick={() => setShowOptionsModal(true)} // Open modal to choose
//                         >
//                             +
//                         </button>
//                     </div>
//                 </div>
                          
//                 {/* Channels Sidebar */}
//                 <div className="channel-sidebar">
//                     <h3 className="space-name">{spaceName}</h3>
                          
//                     {/* Text Channels title with Add Channel button on the right */}
//                     <div className="channel-header">
//                         <span className="channel-title">Text Channels</span>
//                         <button 
//                             className="add-channel-btn" 
//                             onClick={() => setShowCreateChannelModal(true)}
//                         >
//                             +
//                         </button>
//                     </div>
                          
//                     {/* List of Channels */}
//                     <div className="channel-list">
//                         {channels && channels.length > 0 ? (
//                             channels.map((channel) => (
//                                 <div
//                                     key={channel._id}
//                                     className={`channel-item-container ${channel._id === channelId ? "active" : ""}`}
//                                     onClick={() => handleChannelClick(channel._id)}
//                                 >
//                                     <span className="channel-name"># TEST{channel.name}</span>
//                                     <span className="ellipsis">...</span>
//                                 </div>
//                             ))
//                         ) : (
//                             <p>No channels available</p>
//                         )}
//                     </div>
                    
//                     {/* Bottom Options Section: Only show if in a channel */}
//                     {channelId !== undefined && channelId !== null && (
//                         <section className="channel-options-section">
//                             <button 
//                                 className="channel-edit-btn" 
//                                 onClick={handleEditChannel}
//                             >
//                                 Edit Channel
//                             </button>
//                             <button 
//                                 className="channel-delete-btn" 
//                                 onClick={handleDeleteChannel}
//                             >
//                                 Delete Channel
//                             </button>
//                         </section>
//                     )}
//                 </div>

//                 {/* Context Menu for Delete/Edit */}
//                 {showContextMenu && contextMenuPosition && (
//                     <div
//                         id="context-menu"
//                         className="context-menu"
//                         style={{ position: 'absolute', top: contextMenuPosition.y, left: contextMenuPosition.x }}
//                         onClick={(e) => e.stopPropagation()} // Prevent menu clicks from closing it
//                     >
//                         <button onClick={handleEditChannel}>Edit Channel</button>
//                         <button onClick={handleDeleteChannel}>Delete Channel</button>
//                     </div>
//                 )}
                      
//                 {/* Main Chat Area */}
//                 <div className="chat-box">
//                     <h1>Chat for Space: {channelName}</h1>
//                     <div className="message-list">
//                         {messages.length > 0 ? (
//                             messages.map((msg) => (
//                                 <div key={msg.id} className="message">
//                                     <strong>{msg.username}:</strong> {msg.text}
//                                     <span className="timestamp">{msg.timestamp}</span>
//                                 </div>
//                             ))
//                         ) : (
//                             <p>No messages yet. Start the conversation!</p>
//                         )}
//                     </div> 
//                     <div className="message-input">
//                         <MessageInput sendMessage={sendMessage} />
//                     </div>
//                 </div>
                      
//                 {/* Create Channel Modal */}
//                 {showCreateChannelModal && (
//                     <div className="modal">
//                         <div className="modal-content">
//                             <h3>Create a New Channel</h3>
//                             <input
//                                 type="text"
//                                 placeholder="Enter channel name..."
//                                 value={newChannelName ?? ""}
//                                 onChange={(e) => setNewChannelName(e.target.value)} // Track input value
//                             />
//                             <button onClick={handleCreateChannel}>Create</button> {/* Button to create */}
//                             <button onClick={() => setShowCreateChannelModal(false)}>Cancel</button>
//                         </div>
//                     </div>
//                 )}

//                 {showOptionsModal && (
//                     <div className="modal">
//                         <div className="modal-content">
//                             <h3>Choose an option</h3>
//                             <button onClick={() => setModalType("create")}>Create a Server</button>
//                             <button onClick={() => setModalType("join")}>Join with ID</button>
//                             <button onClick={() => setShowOptionsModal(false)}>Cancel</button>
//                         </div>
//                     </div>
//                 )}

//                 {/* Show Create Server Modal */}
//                 {modalType === "create" && (
//                     <CreateSpaceModal
//                         setShowModal={() => setModalType(null)} // Close Create Space Modal (by setting modalType to null)
//                         navigate={navigate}
//                         setShowOptionsModal={setShowOptionsModal} // Pass setShowOptionsModal to close the options modal
//                     />
//                 )}

//                 {/* Show Join Server Modal */}
//                 {modalType === "join" && <JoinSpaceModal setShowModal={() => setModalType(null)} />}
//             </div>
//             );
//         };
//         return <MessageInput sendMessage={sendMessage} />;
//     }