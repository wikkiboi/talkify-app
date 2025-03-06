// import { FormEvent, useEffect, useState } from "react";
// import ChannelList from "../components/ChannelList";
// import { useParams } from "react-router-dom";
// import getSpace from "../api/space/getSpace";
// import { Channel, Space } from "../types/types";
// import createChannel from "../api/channel/createChannel";
// import UserList from "../components/UserList";
// import UserStatus from "../components/UserStatus";

// export default function SpacePage() {
//   const [spaceInfo, setSpaceInfo] = useState<{
//     space: Space;
//     channels: Channel[];
//   }>();
//   const [newChannelName, setNewChannelName] = useState("");
//   const { spaceId } = useParams();

//   useEffect(() => {
//     const fetchSpaceInfo = async () => {
//       const spaceData = await getSpace(spaceId || "");
//       if (spaceData) {
//         setSpaceInfo(spaceData);
//       } else {
//         console.error("Failed to get space info");
//       }
//     };

//     fetchSpaceInfo();
//   }, [spaceId]);

//   async function handleSubmit(e: FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     const newChannel: Channel = await createChannel(
//       newChannelName,
//       spaceId || ""
//     );
//     console.log(newChannel);
//     if (newChannel) {
//       setSpaceInfo((prev) => {
//         if (prev) {
//           return {
//             space: prev.space,
//             channels: [...prev.channels, newChannel],
//           };
//         }
//       });

//       setNewChannelName("");
//     }
//   }

//   return (
//     <div>
//       {spaceInfo?.space.name}
//       {spaceInfo && (
//         <>
//           <ChannelList channels={spaceInfo.channels} />{" "}
//           <UserList users={spaceInfo.space.members} />
//         </>
//       )}

//       <form onSubmit={handleSubmit}>
//         <input
//           id="channel-name"
//           name="channel-name"
//           value={newChannelName}
//           onChange={(e) => setNewChannelName(e.target.value)}
//         />
//         <button>Create New Channel</button>
//       </form>
//       <UserStatus />
//     </div>
//   );
// }
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ServerSidebar from "../components/ServerSidebar";
import ChannelSidebar from "../components/ChannelSidebar";
import ChatBox from "../components/ChatBox";

const SpacePage = () => {
  const { spaceId } = useParams<{ spaceId: string }>();  // Fetch spaceId from URL params
  const navigate = useNavigate();

  // States for server and channels data
  const [server, setServer] = useState<any>(null);
  const [channels, setChannels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);  // Track loading state

  // Redirect if spaceId is invalid
  useEffect(() => {
    if (!spaceId) {
      navigate("/dashboard");  // Redirect to dashboard if spaceId is not found
    }
  }, [spaceId, navigate]);

  // Fetch server and channels only when spaceId is valid
  useEffect(() => {
    if (spaceId) {
      setLoading(true);  // Set loading true when fetching data

      // Fetch server data with messages
      fetch(`http://localhost:5000/api/servers/${spaceId}`)
        .then((res) => res.json())
        .then((data) => {
          if (!data) {
            return navigate("/dashboard"); // Redirect if no server is found
          }
          setServer(data);
        })
        .catch((err) => {
          console.error("Error fetching server:", err);
          setLoading(false); // Stop loading if there's an error
        });

      // Fetch channels for the given server spaceId
      fetch(`http://localhost:5000/api/servers/${spaceId}/channels`)
        .then((res) => res.json())
        .then((data) => {
          setChannels(data);
        })
        .catch((err) => {
          console.error("Error fetching channels:", err);
        })
        .finally(() => setLoading(false)); // Stop loading after fetching data
    }
  }, [spaceId, navigate]);

  // Render loading message if spaceId is not yet valid
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!server || channels.length === 0) {
    return <div>No server or channels found.</div>;  // Ensure proper fallback message
  }

  return (
    <div className="flex">
      {/* Pass spaceId and server data to the sidebar components */}
      <ServerSidebar server={server} />
      <ChannelSidebar channels={channels} spaceId={spaceId} />
      <ChatBox spaceId={spaceId} /> {/* Pass spaceId to ChatBox */}
    </div>
  );
};

export default SpacePage;
