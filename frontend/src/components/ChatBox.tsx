import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../socket";
import getChannelMsgs from "../api/channel/getChannelMsgs";
import parseTimestamp from "../helper/parseTimestamp";

interface Message {
  id: string;
  username: string;
  text: string;
  timestamp: string;
}

export default function ChatChannel() {
  const { spaceId, channelId, groupId } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    async function fetchChannelMsgs() {
      if (!spaceId || !channelId) return;
      const response = await getChannelMsgs(spaceId, channelId);

      console.log(response);

      const channelMsgs = response.map((msg) => {
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
      groupId,
      dmUsers: null,
    });

    setInput("");
  };

  return (
    <div className="max-w-lg mx-auto p-4 border rounded-lg shadow-lg bg-white">
      <div className="h-64 overflow-y-auto border-b p-2 mb-2">
        {messages.map((msg, index) => (
          <div key={index} className="p-1 border-b">
            <strong>{msg.username}: </strong>
            {msg.text} ({msg.timestamp})
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          className="flex-1 p-2 border rounded-l-lg"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
        />
        <button
          className="p-2 bg-blue-500 text-white rounded-r-lg"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
