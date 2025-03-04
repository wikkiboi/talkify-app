"use client"

// import React, { useState } from "react"
import type React from "react"
import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "../components/button"
import { Input } from "../components/input"

type Message = {
  id: string
  content: string
  sender: string
}

type ChannelMessages = {
  [key: string]: Message[]
}

export default function ChatArea({ channel }: { channel: string }) {
  const [input, setInput] = useState("")
  const [channelMessages, setChannelMessages] = useState<ChannelMessages>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(input.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        content: input,
        sender: "User", // In a real app, this would be the actual user's name
      }
      setChannelMessages((prev) => ({
        ...prev,
        [channel]: [...(prev[channel] || []), newMessage],
      }))
      setInput("")
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-green-950">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold text-gray-500">#{channel}</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {channelMessages[channel]?.map((m) => (
          <div key={m.id} className="mb-4">
            <span className="inline-block p-2 rounded-lg bg-gray-700 text-white">
              <strong>{m.sender}:</strong> {m.content}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={onSubmit} className="p-4 border-t border-gray-700">
        <div className="flex items-center">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder={`Message #${channel}`}
            className="flex-grow mr-2 bg-gray-700 text-white"
          />
          <Button type="submit" size="icon" className="bg-blue-500 hover:bg-blue-600">
            <Send size={18} />
          </Button>
        </div>
      </form>
    </div>
  )
}