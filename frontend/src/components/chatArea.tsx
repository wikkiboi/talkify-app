"use client"

import type React from "react"
import { useState } from "react"
import "@/assets/styles/chatStyle.css"
import "@/assets/styles/chatColors.css"

interface ChatAreaProps {
  channel: string
}

const ChatArea: React.FC<ChatAreaProps> = ({ channel }) => {
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      // Handle message sending here
      console.log(`Sending message to ${channel}: ${message}`)
      setMessage("")
    }
  }

  return (
    <div className="chat-area">
      <div className="chat-header">#{channel}</div>
      <div className="chat-messages">{/* Messages will appear here */}</div>
      <form onSubmit={handleSubmit} className="message-input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="message-input"
          placeholder={`Message #${channel}`}
        />
        <button className="send-button">➤</button>
      </form>
    </div>
  )
}

export default ChatArea