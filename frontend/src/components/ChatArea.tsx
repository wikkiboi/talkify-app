"use client";
import { useEffect, useState, KeyboardEvent } from "react";
import "@/assets/styles/chatStyle.css";
import "@/assets/styles/chatColors.css";
import { Message } from "../types/types";
import socket from "../socket";
import { useParams } from "react-router-dom";
import getChannelMsgs from "../api/channel/getChannelMsgs";
import parseTimestamp from "../helper/parseTimestamp";

export default function ChatArea({
  currentChannel,
}: {
  currentChannel: string;
}) {
  const [input, setInput] = useState("");
  const [channelMessages, setChannelMessages] = useState<Message[]>([]);
  const { spaceId, channelId } = useParams();

  useEffect(() => {
    async function fetchChannelMsgs() {
      if (!spaceId || !channelId) return;
      try {
        const response = await getChannelMsgs(spaceId, channelId);
        if (!response) throw new Error("Failed to fetch messages");
        setChannelMessages(response.channelMsgs);
      } catch (error) {
        console.error(error);
      }
    }

    fetchChannelMsgs();

    socket.on("receive-message", (message: Message) => {
      setChannelMessages((prev) => [...prev, message]);
    });

    socket.on("message-deleted", (deletedMessageId: string) => {
      setChannelMessages((prevMessages) =>
        prevMessages.filter((msg) => msg._id !== deletedMessageId)
      );
    });

    return () => {
      socket.off("receive-message");
      socket.off("message-deleted");
    };
  }, [channelId, spaceId]);

  const sendMessage = () => {
    if (!input.trim()) return;
    console.log("test");
    socket.emit("send-message", {
      text: input,
      conversationId: channelId,
    });

    setInput("");
  };

  const shouldShowSender = (index: number) => {
    const currentMessage = channelMessages[index];
    if (index === 0) return true; // First message always shows sender

    const previousMessage = channelMessages[index - 1];
    const timeDiff =
      new Date(currentMessage.timestamp ?? "").getTime() -
      new Date(previousMessage.timestamp ?? "").getTime();

    return (
      currentMessage.sender.userId !== previousMessage.sender.userId ||
      timeDiff > 60 * 1000
    );
  };

  const messages = channelMessages.map((message, index) => {
    return (
      <div key={message._id}>
        {shouldShowSender(index) && (
          <p>
            <strong>
              {message.sender.username}{" "}
              {`Today at ${message.timestamp ?? parseTimestamp(message._id)}`}
            </strong>
          </p>
        )}
        <p>
          <span>
            {message.text} <button>Update</button>
            <button onClick={() => handleDeleteMessage(message._id)}>
              Delete
            </button>
          </span>
        </p>
      </div>
    );
  });

  function handleKeyPress(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      sendMessage();
    }
  }

  async function handleDeleteMessage(messageId: string) {
    socket.emit("delete-message", { messageId }, (response) => {
      console.log("Response from delete-message:", response);
    });
  }

  return (
    <div className="chat-box">
      <h1>Chat for Channel: {currentChannel}</h1>
      <div className="message-list">{messages}</div>
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
    </div>
  );
}
