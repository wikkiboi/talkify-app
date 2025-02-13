import { Hash } from "lucide-react"

const channels = ["general", "random", "introductions", "announcements"]

export default function Sidebar({
  activeChannel,
  setActiveChannel,
}: { activeChannel: string; setActiveChannel: (channel: string) => void }) {
  return (
    <div className="w-64 bg-gray-900 p-4">
      <h1 className="text-2xl font-bold mb-4">Discord Clone</h1>
      <h2 className="text-lg font-semibold mb-2">Channels</h2>
      <ul>
        {channels.map((channel) => (
          <li
            key={channel}
            className={`flex items-center mb-2 cursor-pointer ${
              activeChannel === channel ? "text-white" : "text-gray-400"
            }`}
            onClick={() => setActiveChannel(channel)}
          >
            <Hash size={18} className="mr-2" />
            {channel}
          </li>
        ))}
      </ul>
    </div>
  )
}

