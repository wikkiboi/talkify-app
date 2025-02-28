import { Channel } from "../types/types";

interface ChannelProps {
  channels: Channel[];
}

export default function ChannelList({ channels }: ChannelProps) {
  const channelElements = channels?.map((channel) => (
    <li key={channel._id}>{channel.name}</li>
  ));
  return (
    <div>
      ChannelList
      <ul>{channelElements}</ul>
    </div>
  );
}
