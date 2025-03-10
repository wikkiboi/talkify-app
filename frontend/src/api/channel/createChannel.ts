import axios from "axios";
import { Channel } from "../../types/types";

export default async function createChannel(name: string, spaceId: string) {
  const API_URL = `api/channel/${spaceId}/create`;
  const token = localStorage.getItem("token");

  try {
    const createdChannel = await axios.post<{ channel: Channel }>(
      `http://localhost:3000/${API_URL}`,
      { name, spaceId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return createdChannel.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Create Channel failed:",
        error.response?.data?.message || error.message
      );
    } else if (error instanceof Error) {
      console.error("Unexpected error: ", error.message);
    }
    return null;
  }
}
