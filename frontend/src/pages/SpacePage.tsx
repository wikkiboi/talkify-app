import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Space } from "../types/types";
import { Channel } from "../types/types";
import getSpace from "../api/space/getSpace";
import ChannelSidebar from "../components/channel/ChannelSidebar";
import ChatArea from "../components/chat/ChatArea";
import MemberList from "../components/space/MemberList"; // Import the MemberList component

export default function SpacePage() {
  const { spaceId, channelId } = useParams();
  const [currentSpace, setCurrentSpace] = useState<Space>();
  const [spaceChannels, setSpaceChannels] = useState<Channel[]>([]);
  const [currentChannel, setCurrentChannel] = useState<string>("");

  useEffect(() => {
    const fetchCurrentSpace = async () => {
      if (!spaceId) return;
      const spaceData = await getSpace(spaceId);
      if (spaceData) {
        setCurrentSpace(spaceData.space);
        setSpaceChannels(spaceData.channels);

        spaceData.channels.filter((channel) => {
          if (channel._id === channelId) {
            setCurrentChannel(channel.name);
          }
        });
      } else {
        console.log("Space not found.");
      }
    };

    fetchCurrentSpace();
  }, [spaceId, channelId]);

  return (
    <div className="page-container">
      <div className="chat-container">
        {currentSpace && (
          <>
            <ChannelSidebar
              spaceName={currentSpace.name}
              channels={spaceChannels}
              setChannels={setSpaceChannels}
            />
            <ChatArea currentChat={currentChannel} />
          </>
        )}
      </div>

      <div className="members-container">
        {currentSpace && Array.isArray(currentSpace.members) ? (
          currentSpace.members.length > 0 ? (
            <MemberList users={currentSpace.members} />
          ) : (
            <p>No members in this space</p>
          )
        ) : (
          <p>Loading members...</p>
        )}
      </div>
    </div>
  );
}