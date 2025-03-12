import { useState } from "react";
import socket from "../../socket";

interface UpdateMsgInputProps {
  messageId: string;
  messageText: string;
  setEditingMessageId: (value: React.SetStateAction<string | null>) => void;
}

export default function UpdateMsgInput({
  messageId,
  messageText,
  setEditingMessageId,
}: UpdateMsgInputProps) {
  const [editInput, setEditInput] = useState(messageText);

  const handleUpdateMessage = (messageId: string) => {
    if (!editInput.trim()) return;
    socket.emit("update-message", {
      messageId,
      newText: editInput,
    });

    setEditingMessageId(null);
    setEditInput(editInput);
  };

  const handleCancelEdit = () => {
    setEditingMessageId(null);
    setEditInput(messageText);
  };

  return (
    <div>
      <input
        type="text"
        value={editInput}
        onChange={(e) => setEditInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleUpdateMessage(messageId)}
        autoFocus
      />
      <button onClick={() => handleUpdateMessage(messageId)}>Save</button>
      <button onClick={handleCancelEdit}>Cancel</button>
    </div>
  );
}
