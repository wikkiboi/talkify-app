"use client"

import { Hash, Plus, Volume2 } from "lucide-react"
import { Button } from "@/assets/ui/button"
import { Input } from "@/assets/ui/input"
import { useState } from "react"
import "@/assets/styles/chatColors.css"

interface Channel {
  id: string
  name: string
  type: "text" | "voice"
}

interface ChannelListProps {
  channels: Channel[]
  activeChannel: string
  onChannelSelect: (channelId: string) => void
  onAddChannel: (name: string, type: "text" | "voice") => void
}

export default function ChannelList({ channels, activeChannel, onChannelSelect, onAddChannel }: ChannelListProps) {
  const [isAddingChannel, setIsAddingChannel] = useState(false)
  const [newChannelName, setNewChannelName] = useState("")
  const [newChannelType, setNewChannelType] = useState<"text" | "voice">("text")

  const handleAddChannel = () => {
    if (newChannelName.trim()) {
      onAddChannel(newChannelName.trim(), newChannelType)
      setNewChannelName("")
      setIsAddingChannel(false)
    }
  }

  const textChannels = channels.filter((c) => c.type === "text")
  const voiceChannels = channels.filter((c) => c.type === "voice")

  return (
    <div className="mb-4">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-green-300">Text Channels</h2>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => {
              setNewChannelType("text")
              setIsAddingChannel(true)
            }}
            className="text-green-300 hover:text-white hover:bg-green-900"
          >
            <Plus size={18} />
          </Button>
        </div>
        <ul>
          {textChannels.map((channel) => (
            <li
              key={channel.id}
              className={`flex items-center mb-2 cursor-pointer ${
                activeChannel === channel.id ? "text-white" : "text-green-300"
              } hover:text-white`}
              onClick={() => onChannelSelect(channel.id)}
            >
              <Hash size={18} className="mr-2" />
              {channel.name}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-green-300">Voice Channels</h2>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => {
              setNewChannelType("voice")
              setIsAddingChannel(true)
            }}
            className="text-green-300 hover:text-white hover:bg-green-900"
          >
            <Plus size={18} />
          </Button>
        </div>
        <ul>
          {voiceChannels.map((channel) => (
            <li key={channel.id} className="flex items-center mb-2 cursor-pointer text-green-300 hover:text-white">
              <Volume2 size={18} className="mr-2" />
              {channel.name}
            </li>
          ))}
        </ul>
      </div>

      {isAddingChannel && (
        <div className="flex items-center mt-2">
          <Input
            value={newChannelName}
            onChange={(e) => setNewChannelName(e.target.value)}
            placeholder={`New ${newChannelType} channel`}
            className="mr-2 bg-green-900 text-white border-green-700"
          />
          <Button size="sm" onClick={handleAddChannel} className="bg-green-700 text-white hover:bg-green-600">
            Add
          </Button>
        </div>
      )}
    </div>
  )
}

