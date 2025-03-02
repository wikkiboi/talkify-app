"use client"

import Image from "next/image"
import { Hash, Plus, Volume2 } from "lucide-react"
import { useState } from "react"
import { Button } from "../components/button"
import { Input } from "../components/input"

type Channel = {
  id: string
  name: string
}

type SidebarProps = {
  activeChannel: string
  setActiveChannel: (channel: string) => void
  textChannels: Channel[]
  voiceChannels: Channel[]
  onAddTextChannel: (name: string) => void
  onAddVoiceChannel: (name: string) => void
}

export default function SideBar({
  activeChannel,
  setActiveChannel,
  textChannels,
  voiceChannels,
  onAddTextChannel,
  onAddVoiceChannel,
}: SidebarProps) {
  const [isAddingTextChannel, setIsAddingTextChannel] = useState(false)
  const [isAddingVoiceChannel, setIsAddingVoiceChannel] = useState(false)
  const [newChannelName, setNewChannelName] = useState("")

  const handleAddChannel = (isVoice: boolean) => {
    if(newChannelName.trim()) {
      if(isVoice) {
        onAddVoiceChannel(newChannelName.trim())
      }
      else {
        onAddTextChannel(newChannelName.trim())
      }
      setNewChannelName("")
      setIsAddingTextChannel(false)
      setIsAddingVoiceChannel(false)
    }
  }

  return (
    <div className="w-64 bg-gray-900 p-4 flex flex-col">
      <div className="flex items-center mb-6">
        <Image src="/discord-icon.png" alt="Discord Clone Icon" width={32} height={32} className="mr-2 rounded-full" />
        <h1 className="text-2xl font-bold">Discord Clone</h1>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Text Channels</h2>
          <Button size="icon" variant="ghost" onClick={() => setIsAddingTextChannel(true)}>
            <Plus size={18} />
          </Button>
        </div>
        {isAddingTextChannel && (
          <div className="flex items-center mb-2">
            <Input
              value={newChannelName}
              onChange={(e) => setNewChannelName(e.target.value)}
              placeholder="New channel name"
              className="mr-2"
            />
            <Button size="sm" onClick={() => handleAddChannel(false)}>
              Add
            </Button>
          </div>
        )}
        <ul>
          {textChannels.map((channel) => (
            <li
              key={channel.id}
              className={`flex items-center mb-2 cursor-pointer ${
                activeChannel === channel.id ? "text-white" : "text-gray-400"
              }`}
              onClick={() => setActiveChannel(channel.id)}>
              <Hash size={18} className="mr-2" />
              {channel.name}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Voice Channels</h2>
          <Button size="icon" variant="ghost" onClick={() => setIsAddingVoiceChannel(true)}>
            <Plus size={18} />
          </Button>
        </div>
        {isAddingVoiceChannel && (
          <div className="flex items-center mb-2">
            <Input
              value={newChannelName}
              onChange={(e) => setNewChannelName(e.target.value)}
              placeholder="New voice channel"
              className="mr-2"
            />
            <Button size="sm" onClick={() => handleAddChannel(true)}>
              Add
            </Button>
          </div>
        )}
        <ul>
          {voiceChannels.map((channel) => (
            <li key={channel.id} className="flex items-center mb-2 cursor-pointer text-gray-400">
              <Volume2 size={18} className="mr-2" />
              {channel.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}