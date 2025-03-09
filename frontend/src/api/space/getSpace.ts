import axios from "axios";
import { Channel, Space } from "../../types/types";

export default async function getSpace(spaceId: string) {
  const API_URL = `api/space/${spaceId}`;
  const token = localStorage.getItem("token");

  try {
    const space = await axios.get<{ space: Space; channels: Channel[] }>(
      `http://localhost:3000/${API_URL}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return space.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Get space failed:",
        error.response?.data?.message || error.message
      );
    } else if (error instanceof Error) {
      console.error("Unexpected error: ", error.message);
    }
    return null;
  }
}
