"use client";
import "@/assets/styles/chatStyle.css";
import "@/assets/styles/chatColors.css";
import MessageLog from "./MessageLog";
import MsgInput from "./MsgInput";

export default function ChatArea({
  currentChannel,
}: {
  currentChannel: string;
}) {
  return (
    <div className="chat-box">
      <h1>Chat for Channel: {currentChannel}</h1>
      <MessageLog />
      <MsgInput />
    </div>
  );
}
