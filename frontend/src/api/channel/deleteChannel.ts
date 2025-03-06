import axios from "axios";
import { Channel } from "../../types/types";

export default async function deleteChannel(
  spaceId: string,
  channelId: string
) {
  const API_URL = `api/channel/${spaceId}/${channelId}/delete`;
  const token = localStorage.getItem("token");

  try {
    const deletedChannel = await axios.delete<{ channel: Channel }>(
      `http://localhost:3000/${API_URL}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return deletedChannel.data;
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
