import { Channel } from "../types/types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import createChannel from "../api/channel/createChannel";
import CreateChannelModal from "./CreateChannelModal";
import ChannelSidebar from "./ChannelSidebar";
import ChatArea from "./ChatArea";

interface ChannelSidebarProps {
  spaceName: string;
  spaceChannels: Channel[];
}

export default function CurrentChannel({
  spaceName,
  spaceChannels,
}: ChannelSidebarProps) {
  const [channels, setChannels] = useState<Channel[]>(spaceChannels);
  const [currentChannel, setCurrentChannel] = useState<string>("");
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
  const navigate = useNavigate();
  const { spaceId, channelId } = useParams();

  useEffect(() => {
    channels.filter((channel) => {
      if (channel._id === channelId) {
        setCurrentChannel(channel.name);
      }
    });
  }, [channels, channelId]);

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

  return (
    <>
      <ChannelSidebar
        spaceName={spaceName}
        channels={channels}
        setChannels={setChannels}
        showModal={() => setShowCreateChannelModal(true)}
      />

      <ChatArea currentChannel={currentChannel} />

      {showCreateChannelModal && (
        <CreateChannelModal
          handleCreateChannel={handleCreateChannel}
          showModal={() => setShowCreateChannelModal(false)}
        />
      )}
    </>
  );
}
