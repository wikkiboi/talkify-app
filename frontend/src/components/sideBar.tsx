import type React from "react"
import "@/assets/styles/chatStyle.css"

type Channel = {
  id: string
  name: string
}

interface SidebarProps {
  activeChannel: string
  setActiveChannel: (channelId: string) => void
  textChannels: Channel[]
  voiceChannels: Channel[]
  onAddTextChannel: (name: string) => void
  onAddVoiceChannel: (name: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({
  activeChannel,
  setActiveChannel,
  textChannels,
  voiceChannels,
  onAddTextChannel,
  onAddVoiceChannel,
}) => {
  const handleAddChannel = (isVoice: boolean) => {
    const channelName = prompt(`Enter new ${isVoice ? "voice" : "text"} channel name:`)
    if (channelName) {
      if (isVoice) {
        onAddVoiceChannel(channelName)
      } else {
        onAddTextChannel(channelName)
      }
    }
  }

  return (
    <div className="sidebar">
      <h1 className="app-title">Talkify</h1>

      <div className="channel-section">
        <div className="section-header">
          <span>Text Channels</span>
          <button className="add-button" onClick={() => handleAddChannel(false)}>
            +
          </button>
        </div>
        <ul className="channel-list">
          {textChannels.map((channel) => (
            <li
              key={channel.id}
              className={`channel-item ${activeChannel === channel.id ? "active" : ""}`}
              onClick={() => setActiveChannel(channel.id)}
            >
              <span className="channel-icon">#</span>
              {channel.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="channel-section">
        <div className="section-header">
          <span>Voice Channels</span>
          <button className="add-button" onClick={() => handleAddChannel(true)}>
            +
          </button>
        </div>
        <ul className="channel-list">
          {voiceChannels.map((channel) => (
            <li key={channel.id} className="channel-item">
              <span className="channel-icon">🔊</span>
              {channel.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="user-section">
        <span>Username</span>
      </div>
    </div>
  )
}

export default Sidebar

