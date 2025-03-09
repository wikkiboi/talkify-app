import axios from "axios";
import { Channel } from "../../types/types";

export default async function getSpaceChannels(spaceId: string) {
  const API_URL = `api/space/${spaceId}/channels`;
  const token = localStorage.getItem("token");

  try {
    const channels = await axios.get<{ channels: Channel[] }>(
      `http://localhost:3000/${API_URL}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return channels.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Get Space failed:",
        error.response?.data?.message || error.message
      );
    } else if (error instanceof Error) {
      console.error("Unexpected error: ", error.message);
    }
    return null;
  }
}
