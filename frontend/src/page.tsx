"use client"

import { useState } from "react"
import Sidebar from "./components/Sidebar"
import ChatArea from "./components/ChatArea"

export default function Home() {
  const [activeChannel, setActiveChannel] = useState("general")

  return (
    <div className="flex h-screen bg-gray-800 text-white">
      <Sidebar activeChannel={activeChannel} setActiveChannel={setActiveChannel} />
      <ChatArea channel={activeChannel} />
    </div>
  )
}

