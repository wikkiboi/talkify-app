import React from 'react';

interface Channel {
  _id: string;
  name: string;
}

interface ChannelSidebarProps {
  channels: Channel[];
}

const ChannelSidebar: React.FC<ChannelSidebarProps> = ({ channels }) => {
  return (
    <div>
      <h3>Channels</h3>
      <ul>
        {channels.map((channel) => (
          <li key={channel._id}>{channel.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChannelSidebar;
