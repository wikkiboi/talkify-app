import { useParams } from "react-router-dom";
import socket from "../socket";
import { useState, KeyboardEvent } from "react";

export default function MsgInput() {
  const [input, setInput] = useState("");
  const { channelId, groupId, dmId } = useParams();

  const sendMessage = () => {
    if (!input.trim()) return;
    socket.emit("send-message", {
      text: input,
      conversationId: channelId ?? groupId ?? dmId,
    });

    setInput("");
  };

  function handleKeyPress(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      sendMessage();
    }
  }

  return (
    <div className="message-input">
      <input
        type="text"
        placeholder="Type a message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
