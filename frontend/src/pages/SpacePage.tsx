import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Space } from "../types/types";
import { Channel } from "../types/types";
import getSpace from "../api/space/getSpace";
import CurrentChannel from "../components/CurrentChannel";

export default function SpacePage() {
  const { spaceId } = useParams();

  const [currentSpace, setCurrentSpace] = useState<{
    space: Space;
    channels: Channel[];
  }>();

  useEffect(() => {
    const fetchCurrentSpace = async () => {
      if (!spaceId) return;
      const spaceData = await getSpace(spaceId);
      if (spaceData) {
        setCurrentSpace({
          space: spaceData.space,
          channels: spaceData.channels,
        });
      } else {
        console.log("Space not found.");
      }
    };

    fetchCurrentSpace();
  }, [spaceId]);

  return (
    <div className="chat-container">
      {currentSpace && (
        <CurrentChannel
          spaceName={currentSpace.space.name}
          spaceChannels={currentSpace.channels}
        />
      )}
    </div>
  );
}
