"use client";
import "@/assets/styles/chatStyle.css";
import "@/assets/styles/chatColors.css";
import MsgInput from "./MsgInput";
import MessageLogs from "./MessageLogs";

// currentChat can be the user you are DMing, the channel name, or the group DM name
export default function ChatArea({ currentChat }: { currentChat: string }) {
  return (
    <div className="chat-box">
      <h1>Chat for: {currentChat}</h1>
      <MessageLogs />
      <MsgInput />
    </div>
  );
}
