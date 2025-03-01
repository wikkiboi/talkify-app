import { FormEvent, useEffect, useState } from "react";
import ChannelList from "../components/ChannelList";
import { useParams } from "react-router-dom";
import getSpace from "../api/space/getSpace";
import { Channel, Space } from "../types/types";
import createChannel from "../api/channel/createChannel";

export default function SpacePage() {
  const [spaceInfo, setSpaceInfo] = useState<{
    space: Space;
    channels: Channel[];
  }>();
  const [newChannelName, setNewChannelName] = useState("");
  const { spaceId } = useParams();

  useEffect(() => {
    const fetchSpaceInfo = async () => {
      const spaceData = await getSpace(spaceId || "");
      if (spaceData) {
        setSpaceInfo(spaceData);
      } else {
        console.error("Failed to get space info");
      }
    };

    fetchSpaceInfo();
  }, [spaceId]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newChannel: Channel = await createChannel(
      newChannelName,
      spaceId || ""
    );
    console.log(newChannel);
    if (newChannel) {
      setSpaceInfo((prev) => {
        if (prev) {
          return {
            space: prev.space,
            channels: [...prev.channels, newChannel],
          };
        }
      });

      setNewChannelName("");
    }
  }

  return (
    <div>
      {spaceInfo?.space.name}
      {spaceInfo && <ChannelList channels={spaceInfo.channels} />}
      <form onSubmit={handleSubmit}>
        <input
          id="channel-name"
          name="channel-name"
          value={newChannelName}
          onChange={(e) => setNewChannelName(e.target.value)}
        />
        <button>Create New Channel</button>
      </form>
    </div>
  );
}
