import { useNavigate, useParams } from "react-router-dom";
import { Channel } from "../types/types";
import ChannelDropdown from "./ChannelDropdown";

interface ChannelListProps {
  channels: Channel[];
  onEditChannel: (channelId: string) => void;
  onDeleteChannel: (channelId: string) => Promise<void>;
}

export default function ChannelList({
  channels,
  onEditChannel,
  onDeleteChannel,
}: ChannelListProps) {
  const { spaceId, channelId } = useParams<{
    spaceId: string;
    channelId: string;
  }>();
  const navigate = useNavigate();

  const handleChannelClick = (id: string) => {
    navigate(`/channels/${spaceId}/${id}`);
  };

  return (
    <div className="channel-list">
      {channels.length > 0 ? (
        channels.map((channel) => (
          <div key={channel._id} className="channel-item-container">
            <div
              className={`channel-name ${
                channel._id === channelId ? "active" : ""
              }`}
              onClick={() => handleChannelClick(channel._id)}
            >
              <div className="channel-name"># {channel.name}</div>
              <ChannelDropdown
                channelId={channel._id}
                onEdit={onEditChannel}
                onDelete={onDeleteChannel}
              />
            </div>
          </div>
        ))
      ) : (
        <p>No channels available</p>
      )}
    </div>
  );
}
