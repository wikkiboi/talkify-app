import { Link } from "react-router-dom";
import { Channel } from "../types/types";

interface ChannelProps {
  channels: Channel[];
}

export default function ChannelList({ channels }: ChannelProps) {
  const channelElements = channels?.map((channel) => (
    <Link key={channel._id} to={`./${channel._id}`}>
      {channel.name}
    </Link>
  ));
  return (
    <div>
      Channel List
      <ul>{channelElements}</ul>
    </div>
  );
}
