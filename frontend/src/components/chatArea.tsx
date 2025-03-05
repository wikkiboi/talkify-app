// "use client"

// import type React from "react"
// import { useState } from "react"
// import "@/assets/styles/chatStyle.css"
// import "@/assets/styles/chatColors.css"

// interface ChatAreaProps {
//   channel: string
// }

// const ChatArea: React.FC<ChatAreaProps> = ({ channel }) => {
//   const [message, setMessage] = useState("")

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (message.trim()) {
//       // Handle message sending here
//       console.log(`Sending message to ${channel}: ${message}`)
//       setMessage("")
//     }
//   }

//   return (
//     <div className="chat-area">
//       <div className="chat-header">#{channel}</div>
//       <div className="chat-messages">{/* Messages will appear here */}</div>
//       <form onSubmit={handleSubmit} className="message-input-container">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           className="message-input"
//           placeholder={`Message #${channel}`}
//         />
//         <button className="send-button">➤</button>
//       </form>
//     </div>
//   )
// }

// export default ChatArea
import React from "react";

const ChatArea = ({ serverName }: { serverName: string }) => {
  return (
    <div className="flex flex-col flex-1 bg-gray-900 text-white h-screen">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 text-xl font-semibold">
        {serverName}
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Dummy messages */}
        <div className="mb-2 p-3 bg-gray-800 rounded-md w-fit">Hello there!</div>
        <div className="mb-2 p-3 bg-blue-600 rounded-md w-fit self-end">Hi!</div>
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-700 flex">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-2 bg-gray-800 rounded-md text-white"
        />
        <button className="ml-2 px-4 py-2 bg-blue-600 rounded-md">Send</button>
      </div>
    </div>
  );
};

export default ChatArea;
