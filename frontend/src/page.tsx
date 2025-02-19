"use client"
import React from 'react'
import { useState } from "react"
import SideBar from "./layouts/sideBar"
import ChatArea from "./layouts/chatArea"
// import { Button } from "./components/button"
// import { Input } from "./components/input"

// export default function Home() {
//   const [activeChannel, setActiveChannel] = useState("general")

//   return (
//     <div className="flex h-screen bg-gray-800 text-white">
//       <SideBar activeChannel={activeChannel} setActiveChannel={setActiveChannel} />
//       <ChatArea channel={activeChannel} />
//     </div>
//   )
// }

export default function Home() {
  return <h1 className="text-3xl font-bold text-white">Hello, Talkify!</h1>;
}
