"use client";

import type React from "react";
import { useState } from "react";
import Sidebar from "../components/sideBar";
import ChatArea from "../components/chatArea";
import "@/assets/styles/chatStyle.css";
import "@/assets/styles/chatColors.css";

type Channel = {
  id: string;
  name: string;
};

const ChatAreaLayout: React.FC = () => {
  const [activeChannel, setActiveChannel] = useState("general");
  const [textChannels, setTextChannels] = useState<Channel[]>([
    { id: "general", name: "general" },
    { id: "random", name: "random" },
  ]);
  const [voiceChannels, setVoiceChannels] = useState<Channel[]>([
    { id: "General", name: "General" },
    { id: "Gaming", name: "Gaming" },
  ]);

  const addTextChannel = (name: string) => {
    const newChannel = { id: name.toLowerCase().replace(/\s+/g, "-"), name };
    setTextChannels([...textChannels, newChannel]);
  };

  const addVoiceChannel = (name: string) => {
    const newChannel = { id: name.toLowerCase().replace(/\s+/g, "-"), name };
    setVoiceChannels([...voiceChannels, newChannel]);
  };

  return (
    <div className="chat-container">
      <Sidebar
        activeChannel={activeChannel}
        setActiveChannel={setActiveChannel}
        textChannels={textChannels}
        voiceChannels={voiceChannels}
        onAddTextChannel={addTextChannel}
        onAddVoiceChannel={addVoiceChannel}
      />
      <ChatArea
        channel={textChannels.find((c) => c.id === activeChannel)?.name || ""}
      />
    </div>
  );
};

export default ChatAreaLayout;
