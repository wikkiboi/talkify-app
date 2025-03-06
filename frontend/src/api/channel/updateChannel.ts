import axios from "axios";
import { Channel } from "../../types/types";

export default async function deleteChannel(
  spaceId: string,
  channelId: string,
  name: string
) {
  const API_URL = `api/channel/${spaceId}/${channelId}/update`;
  const token = localStorage.getItem("token");

  try {
    const updatedChannel = await axios.put<{ channel: Channel }>(
      `http://localhost:3000/${API_URL}`,
      { name },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return updatedChannel.data;
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
