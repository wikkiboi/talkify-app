import axios from "axios";
import { Channel } from "../../types/types";

export default async function updateChannelName(
  spaceId: string,
  channelId: string
) {
  const API_URL = `api/channel/${spaceId}/${channelId}/update/default`;
  const token = localStorage.getItem("token");

  try {
    const newDefaultChannel = await axios.put<{ channel: Channel }>(
      `http://localhost:3000/${API_URL}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return newDefaultChannel.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Delete Channel failed:",
        error.response?.data?.message || error.message
      );
    } else if (error instanceof Error) {
      console.error("Unexpected error: ", error.message);
    }
    return null;
  }
}
