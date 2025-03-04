"use client"

import { useState } from "react"
import Sidebar from "@/components/sideBar"
import ChatArea from "@/components/chatArea"

type Channel = {
  id: string
  name: string
}

export default function ChatAreaHome() {
  const [activeChannel, setActiveChannel] = useState("general")
  const [textChannels, setTextChannels] = useState<Channel[]>([
    { id: "general", name: "general" },
    { id: "random", name: "random" },
  ])
  const [voiceChannels, setVoiceChannels] = useState<Channel[]>([
    { id: "General", name: "General" },
    { id: "Gaming", name: "Gaming" },
  ])

  const addTextChannel = (name: string) => {
    const newChannel = { id: name.toLowerCase().replace(/\s+/g, "-"), name }
    setTextChannels([...textChannels, newChannel])
  }

  const addVoiceChannel = (name: string) => {
    const newChannel = { id: name.toLowerCase().replace(/\s+/g, "-"), name }
    setVoiceChannels([...voiceChannels, newChannel])
  }

  return (
    <div className="flex h-screen bg-green-950 text-white">
      <Sidebar
        activeChannel={activeChannel}
        setActiveChannel={setActiveChannel}
        textChannels={textChannels}
        voiceChannels={voiceChannels}
        onAddTextChannel={addTextChannel}
        onAddVoiceChannel={addVoiceChannel}
      />
      <ChatArea channel={textChannels.find((c) => c.id === activeChannel)?.name || ""} />
    </div>
  )
}

