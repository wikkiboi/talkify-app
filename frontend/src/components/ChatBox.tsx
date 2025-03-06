// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import socket from "../socket";
// import getChannelMsgs from "../api/channel/getChannelMsgs";
// import parseTimestamp from "../helper/parseTimestamp";
// import "@/assets/styles/chatStyle.css"
// import "@/assets/styles/chatColors.css"

// interface Message {
//   id: string;
//   username: string;
//   text: string;
//   timestamp: string;
// }

// export default function ChatChannel() {
//   const { spaceId, channelId, groupId } = useParams();
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState<string>("");

//   useEffect(() => {
//     async function fetchChannelMsgs() {
//       if (!spaceId || !channelId) return;
//       const response = await getChannelMsgs(spaceId, channelId);

//       console.log(response);

//       const channelMsgs = response.map((msg: any) => {
//         return {
//           id: msg._id,
//           username: msg.sender.username,
//           text: msg.text,
//           timestamp: parseTimestamp(msg._id),
//         };
//       });

//       setMessages(channelMsgs);
//     }

//     fetchChannelMsgs();

//     socket.on(
//       "receive-message",
//       (id: string, username: string, text: string, timestamp: string) => {
//         setMessages((prev) => [...prev, { id, username, text, timestamp }]);
//       }
//     );

//     return () => {
//       socket.off("receive-message");
//     };
//   }, [channelId, spaceId]);

//   const sendMessage = () => {
//     if (!input.trim()) return;

//     socket.emit("send-message", {
//       text: input,
//       channelId,
//       groupId,
//       dmUsers: null,
//     });

//     setInput("");
//   };

//   return (
//     <div className="max-w-lg mx-auto p-4 border rounded-lg shadow-lg bg-white">
//       Chat
//       <div className="h-64 overflow-y-auto border-b p-2 mb-2">
//         {messages.map((msg, index) => (
//           <div key={index} className="p-1 border-b">
//             <strong>{msg.username}: </strong>
//             {msg.text} ({msg.timestamp})
//           </div>
//         ))}
//       </div>
//       <div className="flex">
//         <input
//           type="text"
//           className="flex-1 p-2 border rounded-l-lg"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           placeholder="Type a message..."
//         />
//         <button
//           className="p-2 bg-blue-500 text-white rounded-r-lg"
//           onClick={sendMessage}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import getUserSpaces from "../api/user/getUserSpaces";
import { Space } from "../types/types";
import logo from "../assets/logo.png";
import CreateSpaceModal from "../components/CreateSpaceModal";

export default function ChatPage() {
  const { spaceId } = useParams<{ spaceId: string }>();
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpaces = async () => {
      const spacesData = await getUserSpaces();
      if (spacesData) {
        setSpaces(spacesData);
      }
    };

    fetchSpaces();
  }, []);

  const handleSpaceClick = (id: string) => {
    navigate(`/space/${id}`);
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
              className="space-item"
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
        <h3>Channels</h3>
        <ul>
          <li># General</li>
          <li># Random</li>
          <li># Announcements</li>
        </ul>
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
    </div>
  );
}