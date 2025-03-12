import { useEffect, useState } from "react";
import { Message } from "../types/types";
import socket from "../socket";
import parseTimestamp from "../helper/parseTimestamp";
import { useParams } from "react-router-dom";
import getChannelMsgs from "../api/channel/getChannelMsgs";
import getPrivateDmMsgs from "../api/dm/getPrivateDmMsgs";
import getGroupDmMsgs from "../api/dm/getGroupDmMsgs";
import UpdateMsgInput from "./UpdateMsgInput";

export default function MessageLog() {
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const { spaceId, channelId, dmId, groupId } = useParams();

  useEffect(() => {
    async function fetchChannelMsgs() {
      if (!spaceId || !channelId) return;
      try {
        const response = await getChannelMsgs(spaceId, channelId);
        if (!response) throw new Error("Failed to fetch messages");
        setMessages(response.channelMsgs);
      } catch (error) {
        console.error(error);
      }
    }

    async function fetchDmMsgs() {
      if (!dmId) return;
      try {
        const response = await getPrivateDmMsgs(dmId);
        if (!response) throw new Error("Failed to fetch messages");
        setMessages(response);
      } catch (error) {
        console.error(error);
      }
    }

    async function fetchGroupDmMsgs() {
      if (!groupId) return;
      try {
        const response = await getGroupDmMsgs(groupId);
        if (!response) throw new Error("Failed to fetch messages");
        setMessages(response);
      } catch (error) {
        console.error(error);
      }
    }

    if (spaceId && channelId) {
      fetchChannelMsgs();
    } else if (dmId) {
      fetchDmMsgs();
    } else if (groupId) {
      fetchGroupDmMsgs();
    }

    socket.emit("join-conversation", { conversationId: channelId });

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

  const shouldShowSender = (index: number) => {
    const currentMessage = messages[index];
    if (index === 0) return true;

    const previousMessage = messages[index - 1];
    const timeDiff =
      new Date(currentMessage.timestamp ?? "").getTime() -
      new Date(previousMessage.timestamp ?? "").getTime();

    return (
      currentMessage.sender.userId !== previousMessage.sender.userId ||
      timeDiff > 60 * 1000
    );
  };

  const handleDeleteMessage = (messageId: string) => {
    socket.emit("delete-message", { messageId });
  };

  const messageList = messages.map((message, index) => (
    <div key={message._id}>
      {shouldShowSender(index) && (
        <p>
          <strong>
            {message.sender.username}{" "}
            {`Today at ${message.timestamp ?? parseTimestamp(message._id)}`}
          </strong>
        </p>
      )}

      {editingMessageId === message._id ? (
        <UpdateMsgInput
          messageId={message._id}
          messageText={message.text}
          setEditingMessageId={setEditingMessageId}
        />
      ) : (
        // Normal display mode
        <p>
          <span>
            {message.text}{" "}
            {socket.connected && (
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
          </span>
        </p>
      )}
    </div>
  ));
  return <div className="message-list">{messageList}</div>;
}
