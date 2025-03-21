import axios from "axios";
import { Message } from "../../types/types";

export default async function getChannelMsgs(
  spaceId: string,
  channelId: string
) {
  const API_URL = `api/channel/${spaceId}/${channelId}/msgs`;
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get<{ messages: Message[] }>(
      `http://localhost:3000/${API_URL}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Get Channel Msgs failed:",
        error.response?.data?.message || error.message
      );
    } else if (error instanceof Error) {
      console.error("Unexpected error: ", error.message);
    }
    return null;
  }
}
