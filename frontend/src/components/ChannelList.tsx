import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Channel {
  id: string;
  name: string;
}

function ChannelSidebar({ serverId }: { serverId?: string }) {
  const [channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {
    if (!serverId) return;

    fetch(`http://localhost:5000/api/servers/${serverId}/channels`) // Fetch channels based on server
      .then((res) => res.json())
      .then((data) => setChannels(data))
      .catch((error) => console.error("Error fetching channels:", error));
  }, [serverId]); // Runs when serverId changes

  if (!serverId) return <div className="w-60 bg-gray-900 p-4 text-white">Select a server</div>;

  return (
    <div className="w-60 bg-gray-900 p-4 text-white">
      <h2 className="text-xl font-bold mb-4">Server {serverId}</h2>
      <div className="mb-2">Text Channels</div>
      {channels.map((channel) => (
        <Link 
          key={channel.id} 
          to={`/space/${serverId}/${channel.id}`} 
          className="block p-2 bg-gray-800 rounded-md hover:bg-gray-700">
          # {channel.name}
        </Link>
      ))}
    </div>
  );
}

export default ChannelSidebar;
