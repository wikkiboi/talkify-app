"use client"
import React from 'react'
import sideBar from "./layouts/sideBar"
import chatArea from "./layouts/chatArea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Home() {
  return (
    <main>
      <h1>Hi This is Talkify</h1>
      <sideBar />
      <chatArea />
      <Button>Click me</Button>
      <Input placeholder="Type something..." />
    </main>
  )
}