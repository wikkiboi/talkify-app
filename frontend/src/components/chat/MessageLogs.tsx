import { useEffect, useState } from "react";
import { Message } from "../../types/types";
import socket from "../../socket";
import parseTimestamp from "../../helper/parseTimestamp";
import { useParams } from "react-router-dom";
import getChannelMsgs from "../../api/channel/getChannelMsgs";
import getPrivateDmMsgs from "../../api/dm/getPrivateDmMsgs";
import getGroupDmMsgs from "../../api/dm/getGroupDmMsgs";
import UpdateMsgInput from "./UpdateMsgInput";

export default function MessageLogs() {
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const { spaceId, channelId, dmId, groupId } = useParams();
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    messageId: string;
  } | null>(null);

  useEffect(() => {
    async function fetchMessages() {
      try {
        if (spaceId && channelId) {
          const response = await getChannelMsgs(spaceId, channelId);
          if (!response) throw new Error("Failed to fetch messages");

          setMessages(response.messages);
        } else if (dmId) {
          const response = await getPrivateDmMsgs(dmId);
          console.log(response);
          if (!response) throw new Error("Failed to fetch messages");

          setMessages(response.messages);
        } else if (groupId) {
          const response = await getGroupDmMsgs(groupId);
          if (!response) throw new Error("Failed to fetch messages");

          setMessages(response.messages);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchMessages();

    socket.emit("join-conversation", {
      conversationId: channelId ?? dmId ?? groupId,
    });

    socket.on("receive-message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("message-deleted", (deletedMessageId: string) => {
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg._id !== deletedMessageId)
      );
    });

    socket.on("message-updated", (updatedMessage: Message) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === updatedMessage._id
            ? { ...msg, text: updatedMessage.text }
            : msg
        )
      );
    });

    return () => {
      socket.off("receive-message");
      socket.off("message-deleted");
      socket.off("message-updated");
    };
  }, [channelId, spaceId, dmId, groupId]);

  const clusterMessages = (index: number) => {
    const currentMessage = messages[index];
    if (index === 0) return true;

    const previousMessage = messages[index - 1];
    const timeDiff =
      new Date(currentMessage.createdAt).getTime() -
      new Date(previousMessage.createdAt).getTime();

    return (
      currentMessage.sender.userId !== previousMessage.sender.userId ||
      timeDiff > 60 * 1000
    );
  };

  const handleDeleteMessage = (messageId: string) => {
    socket.emit("delete-message", { messageId });
  };

  const handleRightClick = (event: React.MouseEvent, messageId: string) => {
    event.preventDefault();
    setContextMenu({ x: event.clientX, y: event.clientY, messageId });
  };

  return (
    <div className="message-list" onClick={() => setContextMenu(null)}>
      {messages.map((message, index) => (
        <div
          key={message._id}
          className="message"
          onContextMenu={(e) => handleRightClick(e, message._id)}
        >
          {clusterMessages(index) && (
            <p className="message-header">
              <strong className="username">{message.sender.username}</strong>{" "}
              <span className="timestamp">
                {message.timestamp ?? parseTimestamp(message._id)}
              </span>
            </p>
          )}

          {editingMessageId === message._id ? (
            <UpdateMsgInput
              messageId={message._id}
              messageText={message.text}
              setEditingMessageId={setEditingMessageId}
            />
          ) : (
            <p className="message-text">{message.text}</p>
          )}
        </div>
      ))}

      {contextMenu && (
        <div
          className="context-menu"
          style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
        >
          <button onClick={() => setEditingMessageId(contextMenu.messageId)}>
            Edit
          </button>
          <button onClick={() => handleDeleteMessage(contextMenu.messageId)}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

{
  /* <>
  {message.text}{" "}
  {userInfo.username === message.sender.username && (
    <>
      <button
        onClick={() => {
          setEditingMessageId(message._id);
        }}
      >
        Update
      </button>
      <button onClick={() => handleDeleteMessage(message._id)}>
        Delete
      </button>
    </>
  )}
  </> */
}
