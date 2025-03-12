import ChannelList from "./ChannelList";
import { Channel } from "../types/types";
import deleteChannel from "../api/channel/deleteChannel";
import { useParams } from "react-router-dom";

interface ChannelSidebarProps {
  spaceName: string;
  channels: Channel[];
  setChannels: React.Dispatch<React.SetStateAction<Channel[]>>;
  showModal: (value: React.SetStateAction<boolean>) => void;
}

export default function ChannelSidebar({
  spaceName,
  channels,
  setChannels,
  showModal,
}: ChannelSidebarProps) {
  const { spaceId } = useParams();

  const handleEditChannel = (channelId: string) => {
    console.log(channelId);
    // Implement your edit logic here (e.g., open a modal)
  };

  const handleDeleteChannel = async (channelId: string) => {
    try {
      if (!spaceId) throw new Error("Space not found");
      const deletedChannel = await deleteChannel(spaceId, channelId);

      if (deletedChannel) {
        setChannels((prev) =>
          prev.filter((channel) => channel._id !== deletedChannel.channel._id)
        );
      }
    } catch (error) {
      console.error("Error deleting channel:", error);
    }
  };

  function handleInvite() {}

  return (
    <>
      <div className="channel-sidebar">
        <div>
          <h3 className="space-name">{spaceName}</h3>
          <button onClick={handleInvite}>Create Invite</button>
        </div>
        <div className="channel-header">
          <span className="channel-title">Text Channels</span>
          <button className="add-channel-btn" onClick={() => showModal(true)}>
            +
          </button>
        </div>

        <ChannelList
          channels={channels}
          onEditChannel={handleEditChannel}
          onDeleteChannel={handleDeleteChannel}
        />
      </div>
    </>
  );
}
