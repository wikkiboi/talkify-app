import ChannelList from "./ChannelList";
import { Channel, UserSpace } from "../../types/types";
import deleteChannel from "../../api/channel/deleteChannel";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import CreateChannelModal from "../modals/CreateChannelModal";
import CreateInviteModal from "../modals/CreateInviteModal";
import createChannel from "../../api/channel/createChannel";
import updateChannelName from "../../api/channel/updateChannelName";
import deleteSpace from "../../api/space/leaveSpace";

interface ChannelSidebarProps {
  spaceName: string;
  spaceId: string;
  channels: Channel[];
  setChannels: React.Dispatch<React.SetStateAction<Channel[]>>;
  setSpaces: React.Dispatch<React.SetStateAction<UserSpace[]>>;
}

export default function ChannelSidebar({
  spaceName,
  // spaceId,
  channels,
  setChannels,
  setSpaces,
}: ChannelSidebarProps) {
  const { spaceId } = useParams();
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
  const [showCreateInviteModal, setShowCreateInviteModal] = useState(false);
  const navigate = useNavigate();

  const handleEditChannel = async (channelId: string, name: string) => {
    try {
      if (!spaceId) throw new Error("Space not found");
      const updatedChannel = await updateChannelName(spaceId, channelId, name);

      if (updatedChannel) {
        setChannels((prevChannels) =>
          prevChannels.map((channel) =>
            channel.name !== updatedChannel.channel.name
              ? { ...channel, name: updatedChannel.channel.name }
              : channel
          )
        );
      }
    } catch (error) {
      console.error("Error deleting channel:", error);
    }
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

  const handleLeaveSpace = async () => {
    if (!spaceId) {
      console.error("Space ID is missing or invalid.");
      return;
    }
    
    try {
      const result = await deleteSpace(spaceId);
      if (result) {
        // Handle successful space leaving
        console.log("Successfully left the space.");
        // Optionally, navigate away or update state
      }
    } catch (error) {
      console.error("Error leaving space", error);
    }
  };

  const handleInvite = () => {
    setShowCreateInviteModal(true); // Open the Create Invite modal
  };

  return (
    <>
      <div className="channel-sidebar">
        <div>
          <h3 className="space-name">{spaceName}</h3>
          <button className="createInvite-btn" onClick={handleInvite}>Create Invite</button>
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

        <button className="leave-space-btn" onClick={handleLeaveSpace}>
          Leave Space
        </button>
      </div>

      {showCreateChannelModal && (
        <CreateChannelModal
          handleCreateChannel={handleCreateChannel}
          showModal={() => setShowCreateChannelModal(false)}
        />
      )}

      {showCreateInviteModal && (
        <CreateInviteModal
          setModalType={setShowCreateInviteModal}
          setShowOptionsModal={() => {}}
          setShowModal={setShowCreateInviteModal} // Optional, can use this to hide the modal
        />
      )}
    </>
  );
}
