import ChannelList from "./ChannelList";
import { Channel } from "../types/types";
import deleteChannel from "../api/channel/deleteChannel";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import CreateChannelModal from "./CreateChannelModal";
import createChannel from "../api/channel/createChannel";

interface ChannelSidebarProps {
  spaceName: string;
  channels: Channel[];
  setChannels: React.Dispatch<React.SetStateAction<Channel[]>>;
}

export default function ChannelSidebar({
  spaceName,
  channels,
  setChannels,
}: ChannelSidebarProps) {
  const { spaceId } = useParams();
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
  const navigate = useNavigate();

  const handleEditChannel = (channelId: string) => {
    console.log(channelId);
    // Implement your edit logic here (e.g., open a modal)
  };

  const handleCreateChannel = async (newChannelName: string) => {
    if (!newChannelName.trim() || !spaceId) {
      console.error("Channel name is empty or spaceId is missing.");
      return;
    }

    try {
      const newChannel = await createChannel(newChannelName, spaceId);
      if (newChannel) {
        setShowCreateChannelModal(false);
        setChannels((prev) => [...prev, newChannel.channel]);

        navigate(`/channels/${spaceId}/${newChannel.channel._id}`);
      } else {
        console.error("Failed to create channel.");
      }
    } catch (error) {
      console.error("Error creating channel:", error);
    }
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
          <button
            className="add-channel-btn"
            onClick={() => setShowCreateChannelModal(true)}
          >
            +
          </button>
        </div>

        <ChannelList
          channels={channels}
          onEditChannel={handleEditChannel}
          onDeleteChannel={handleDeleteChannel}
        />
      </div>

      {showCreateChannelModal && (
        <CreateChannelModal
          handleCreateChannel={handleCreateChannel}
          showModal={() => setShowCreateChannelModal(false)}
        />
      )}
    </>
  );
}
